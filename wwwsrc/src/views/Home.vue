<template>
  <div class="home container-fluid" style="height: 100vh">
    <nav class="navbar navbar-light border-bottom">
      <a class="navbar-brand" href="#">
        <img alt="StackUnderflow" width="180" src="../assets/logo.png" />
      </a>
      <div class="nav-right">
        <span class v-if="user.id">Hello {{user.username}}</span>
        <span class="action muted ml-3 text-info" v-if="user.id" @click="addQuestion">Ask a Question</span>
        <router-link v-else to="/login">Login</router-link>
      </div>
    </nav>
    <div class="main-content">
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
</template>

<script>
import Auth from "@/components/Auth.vue";
import { api } from "../utils";
import Swal from "sweetalert2";
export default {
  async mounted() {
    let res = await api.get("questions");
    this.questions = res.data;
    if (this.usesAuth) {
      this.$store.dispatch("authenticate");
    }
  },
  name: "home",
  data() {
    return {
      usesAuth: true,
      questions: [],
      question: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
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
          "Describe the Question",
        ])
        .then(result => {
          if (result.value) {
            api.post("questions", {
              title: result.value[0],
              body: result.value[1]
            })
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
</style>
