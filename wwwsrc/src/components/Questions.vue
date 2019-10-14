<template>
  <div class="questions">
    <categories @selected="(s) => query = s" />
    <div class="searchbar">
      <div class="m-3">
        <hr />
        <div class="d-flex align-items-center">
          <input type="text" class="form-control square" placeholder="search" v-model="query" />
          <i class="fa fa-fw fa-search"></i>
        </div>
        <div class="text-right p-1 mb-3" v-if="user.id">
          <button class="btn btn-outline-warning" @click="addQuestion">Ask a Question</button>
        </div>
      </div>
    </div>
    <div class="m-3">
      <div
        v-if="!questions.length"
        class="d-flex align-items-center justify-content-center"
        style="min-height: 60vh"
      >
        <div style="opacity: .5;">
          <img class="mb-3 img-fluid" src="quiet.png" alt />
          <p class="text-center">It is pretty quiet around here... You should ask a question</p>
        </div>
      </div>
      <div
        class="card p-2 mb-3"
        v-for="q in filtered"
        :key="q.id"
        :class="q.answerId ? 'border border-success':''"
      >
        <router-link
          class="d-flex align-items-center flex-wrap justify-content-between"
          :to="{name: 'question', params: {id: q.id}}"
        >
          <h5 class="m-0">
            <i v-if="q.answerId" class="fa fa-fw fa-check text-success mr-2"></i>
            <span>{{q.title}}</span>
          </h5>
          <div>
            <small v-if="q.tags.length">
              <span class="mr-1 p-1 border" v-for="tag in q.tags" :key="tag.id">{{tag.name}}</span>
            </small>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../utils";
import Swal from "sweetalert2";
import Categories from "./Categories.vue";

export default {
  async mounted() {
    try {
      let res = await api.get("questions");
      this.$store.commit("setResource", {
        resource: "questions",
        data: res.data
      });
    } catch (e) {}
  },
  data() {
    return {
      question: {},
      query: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    filtered() {
      if (!this.query.length) {
        return this.questions;
      }
      let q = this.query.toLowerCase();
      return this.questions.filter(q => {
        try {
          return q.tags.find(c => c.name.toLowerCase().includes(q));
        } catch (e) {
          return false;
        }
      });
    },
    questions() {
      return this.$store.state.questions;
    }
  },
  methods: {
    async addQuestion() {
      Swal.mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1", "2"]
      })
        .queue([
          {
            title: "Question Title",
            text: "What do you want to know?"
          },
          "Describe the Question"
        ])
        .then(async result => {
          if (result.value) {
            let res = await api.post("questions", {
              title: result.value[0],
              body: result.value[1]
            });
            this.$router.push({
              name: "question",
              params: { id: res.data.id }
            });
          }
        });
    }
  },
  components: {
    Categories
  }
};
</script>

<style>
a {
  color: orange;
  transition: all .2s linear;
}
a:hover {
  color: #ffc964;
  text-decoration: none;
}
.searchbar {
  position: relative;
}
.searchbar input {
  padding-left: 2em;
}
.searchbar input:focus {
  outline: none;
}
.searchbar i {
  position: absolute;
  left: 1.5em;
}
button.swal2-styled.swal2-confirm {
  background: orange;
}
.swal2-header .swal2-progress-steps .swal2-progress-step {
  background-color: orange;
}
.swal2-progress-steps
  .swal2-progress-step.swal2-active-progress-step
  ~ .swal2-progress-step-line {
  background-color: #ffd383;
}
.swal2-progress-steps .swal2-progress-step-line {
  background-color: orange;
}
.swal2-progress-steps
  .swal2-progress-step.swal2-active-progress-step
  ~ .swal2-progress-step {
  background-color: #ffd383;
}
</style>
