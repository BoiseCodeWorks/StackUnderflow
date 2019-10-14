<template>
  <div class="m-3" v-if="question.id">
    <div class="card p-2">
      <h3>{{q.title}}</h3>
      <p>{{q.body}}</p>
      <hr />
      <p>
        <small class="mr-1 p-1 border" v-for="tag in q.tags" :key="tag.id">
          <span>{{tag.name}}</span>
          <i
            class="fa fa-fw fa-times ml-1"
            v-if="user.id == question.authorId"
            @click="removeCat(tag)"
          ></i>
        </small>
        <select v-model="newCat" @change="addCat" v-if="user.id == question.authorId">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category"
          >{{category.name}}</option>
        </select>
      </p>
    </div>
    <div class="card mt-3 p-2" v-for="r in responses" :key="r.id">
      <div class="d-flex align-items-center">
        <h5 v-if="r.id == q.answerId">
          <i class="fa fa-fw fa-check text-success fa-lg mr-3"></i>
        </h5>
        <p>{{r.body}}</p>
      </div>
      <hr />
      <div class="d-flex align-items-center justify-content-between p-2">
        <p v-if="r.author">{{r.author.username}}</p>
        <button
          v-if="!q.answerId && q.authorId == user.id"
          @click="markAnswer(r)"
          class="btn btn-success"
        >Mark Correct</button>
      </div>
    </div>
    <div class="text-right p-1 mb-3" v-if="user.id">
      <button class="btn btn-outline-warning" @click="addReply">Reply</button>
    </div>
  </div>
  <div
    class="d-flex align-items-center justify-content-center text-muted"
    style="min-height: 80vh"
    v-else
  >
    <div>
      <h4 class="typewriter">{{message}}</h4>
    </div>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import { api, toastError, toast } from "../utils";

export default {
  async mounted() {
    try {
      if (!this.$store.state.categories.length) {
        let catRes = await api.get("categories");
        this.$store.commit("setResource", {
          resource: "categories",
          data: res.data
        });
      }
      let res = await api.get("questions/" + this.route.params.id);
      let res2 = await api.get(
        "questions/" + this.route.params.id + "/responses"
      );
      this.question = res.data;
      this.responses = res2.data;
    } catch (e) {
      this.message = "Question not found";
      toastError(e);
    }
  },
  name: "Question",
  data() {
    return {
      question: {},
      responses: [],
      newCat: {},
      message: "Fetching Question...."
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    async markAnswer(r) {
      try {
        this.question.answerId = r.id;
        let res = await api.put("questions/" + this.question.id, this.question);
        this.question = res.data;
      } catch (e) {
        toastError(e);
      }
    },
    async addCat() {
      try {
        let found = this.question.tags.find(t => t.id == this.newCat.id);
        if (found) {
          this.newCat = {};
          throw new Error("Question is already in this category");
        }
        await api.put("questions/" + this.question.id + "/categories", {
          categoryId: this.newCat.id,
          action: "add"
        });
        this.question.tags.push(this.newCat);
        this.newCat = {};
      } catch (e) {
        toastError(e);
      }
    },
    async removeCat(cat, i) {
      try {
        await api.put("questions/" + this.question.id + "/categories", {
          categoryId: cat.id,
          action: "remove"
        });
        this.question.tags.splice(i, 1);
      } catch (e) {
        toastError(e);
      }
    },
    async addReply() {
      Swal.mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1"]
      })
        .queue(["Reply to Question"])
        .then(async result => {
          if (result.value) {
            let res = await api.post("responses", {
              questionId: this.question.id,
              body: result.value[0]
            });
          }
        });
    }
  },
  components: {
    Auth
  }
};
</script>

<style>
.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
