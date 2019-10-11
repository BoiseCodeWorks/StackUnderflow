<template>
  <div class="home container-fluid" style="height: 100vh">
    <div class="d-flex h-100 w-100 flex-column align-items-center justify-content-center">
      <div class="row">
        <div class="text-center mt-5 mb-2">
          <router-link :to="{name:'home'}">
            <img alt="StackUnderflow" src="../assets/logo.png" />
          </router-link>
            <div>
              <em
                class="pt-1"
                style="color: orange; border-top: 1px solid black;"
              >Good Questions, Great Answers</em>
            </div>
        </div>
      </div>
      <auth style="width: 100%" v-if="usesAuth" />
    </div>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";

export default {
  mounted() {
    if (this.usesAuth) {
      this.$store.dispatch("authenticate");
    }
  },
  name: "home",
  data() {
    return {
      usesAuth: true
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {},
  components: {
    Auth
  }
};
</script>

<style>
</style>
