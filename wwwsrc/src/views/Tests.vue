<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

    <div class="row">
      <div class="col-12 mb-3 text-center">
        <div class="d-flex flex-column align-items-center mb-3 mt-3">
          <img src="logo.png" />
          <em
            class="pt-1"
            style="color: orange; border-top: 1px solid black;"
          >Good Questions, Great Answers</em>
        </div>

        <auth v-if="usesAuth" />
        <div v-if="usesAuth" class="row">
          <div class="col-12">
            <hr />
          </div>
        </div>

        <div class="card border-info">
          <div class="card-body readMeSection text-left">
            <h3 class="d-flex align-items-center justify-content-between">
              <span>Welcome</span>
              <button class="btn btn-secondary" @click="runAll">
                <span>Run All Suites</span>
              </button>
            </h3>
            <div>
              <em class="action text-info" @click="toggleReadme">{{readMe ? 'close':'view'}} readme</em>
            </div>
            <div class="instructions" v-if="readMe">
              <p>
                This tool is designed to test very specific routes in your application's backend.
                <strong>If your routes are different or they return the wrong type of data these tests will not work.</strong>
              </p>
              <p>Each test will tell you what route it is testing, what data (if any) should be sent to the API, and what the response should be.</p>
              <p>Once the test passes, it will turn green, and the next test will be called. Each suite of tests will correspond to a controller in your backend. The suites have been designed to test one controller at a time</p>
              <p>Be sure to read your error messages in the console if a test does not pass.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr />
      </div>
    </div>

    <div class="row" v-for="s in suites" :key="s.name">
      <div class="col-12">
        <suite :suite="s" />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import Suite from "@/components/Suite.vue";

export default {
  mounted() {
    if (this.usesAuth) {
      this.$store.dispatch("authenticate");
    }
    this.readMe = JSON.parse(window.localStorage.getItem(this.title));
  },
  name: "tests",
  data() {
    return {
      title: "StackUnderflow",
      readMe: false,
      usesAuth: true
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    suites() {
      return this.$store.state.suites;
    }
  },
  methods: {
    toggleReadme() {
      this.readMe = !this.readMe;
      window.localStorage.setItem(this.title, this.readMe);
    },
    runAll() {
      try {
        Promise.all(this.suites.map(s => s.runTests.call(s)));
      } catch (e) {
        console.error(e);
      }
    }
  },
  components: {
    Auth,
    Suite
  }
};
</script>
