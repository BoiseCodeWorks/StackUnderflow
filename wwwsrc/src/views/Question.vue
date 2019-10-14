<template>
  <div class="home container-fluid" style="height: 100vh">
    <nav class="navbar navbar-light border-bottom">
      <a class="navbar-brand" href="#">
        <img alt="StackUnderflow" width="180" src="../assets/logo.png" />
      </a>
      <div class="nav-right">
        <span class v-if="user.id">Hello {{user.username}}</span>
        <router-link v-else to="/login">Login</router-link>
      </div>
    </nav>
    <div class="main-content">
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
        <h5>
          <i class="fa fa-fw fa-check text-success fa-lg" v-if="r.id == q.answerId"></i>
          {{r.body}}
        </h5>
        <p>
          <button
            v-if="!q.answerId && q.authorId == user.id"
            @click="markAnswer(r)"
            class="btn btn-success"
          >Mark Correct</button>
        </p>
        <hr />
        <p v-if="r.author">{{r.author.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import { api, toastError } from "../utils";

export default {
  async mounted() {
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
  },
  name: "Question",
  data() {
    return {
      question: {},
      responses: [],
      newCat: {}
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
        console.error(e);
      }
    },
    addCat() {
      try {
        let found = this.question.tags.find(t => t.id == this.newCat.id);
        if (found) {
          this.newCat = {};
          throw new Error("Question is already in this category");
        }
        api.put("questions/" + this.question.id + "/categories", {
          categoryId: this.newCat.id,
          action: "add"
        });
        this.question.tags.push(this.newCat);
        this.newCat = {};
      } catch (e) {
        toastError(e);
      }
    },
    removeCat(cat, i) {
      try {
        api.put("questions/" + this.question.id + "/categories", {
          categoryId: cat.id,
          action: "remove"
        });
        this.question.tags.splice(i, 1);
      } catch (e) {
        toastError(e);
      }
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
