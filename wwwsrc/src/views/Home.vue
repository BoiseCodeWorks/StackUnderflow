<template>
  <div class="home container-fluid" style="min-height: calc(98vh - 60px)">
    <div class="main-content">
      <div class="searchbar">
        <div class="m-3">
          <div class="d-flex align-items-center">
            <input type="text" class="form-control square" placeholder="search" />
            <i class="fa fa-fw fa-search"></i>
          </div>
          <div class="text-right p-1 mb-3">
            <button class="btn btn-outline-warning" @click="addQuestion">Ask a Question</button>
          </div>
        </div>
      </div>
      <div class="m-3">
        <div v-if="!questions.length" class="d-flex align-items-center justify-content-center" style="min-height: 50vh">
          <div style="opacity: .5;">
            <img class="mb-3" src="quiet.png" alt="">
            <p>It is pretty quiet around here... You should ask a question</p>
          </div>
        </div>
        <div class="card p-2" v-for="q in questions" :key="q.id">
          <router-link :to="{name: 'question', params: {id: q.id}}">
            <h5>{{q.title}}</h5>
            <p>
              <span class="mr-1 p-1 bg-dark" v-for="tag in q.tags" :key="tag.id">{{tag.name}}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import { api } from "../utils";
import Swal from "sweetalert2";
export default {
  async mounted() {
    try {
      let res = await api.get("questions");
      this.questions = res.data;
    } catch (e) {}
  },
  name: "home",
  data() {
    return {
      questions: [],
      question: {},
      query: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    filtered() {
      let q = this.query.toLowerCase();
      return this.questions.filter(q => {
        try {
          return q.tags.find(c => c.name.toLowerCase().includes(q));
        } catch (e) {
          return false;
        }
      });
    }
  },
  methods: {
    addQuestion() {
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
        .then(result => {
          if (result.value) {
            api.post("questions", {
              title: result.value[0],
              body: result.value[1]
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
a {
  color: orange;
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
