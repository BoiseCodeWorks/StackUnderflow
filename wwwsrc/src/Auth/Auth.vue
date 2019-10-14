<template>
  <div class="container" style="height: 100vh">
    <div class="d-flex h-100 w-100 flex-column align-items-center justify-content-center">
      <div class="row">
        <div class="text-center mt-5 mb-2">
          <router-link :to="{name:'home'}">
            <img class="mb-3" alt="StackUnderflow" src="../assets/logo.png" />
          </router-link>
          <div>
            <em
              class="pt-1"
              style="color: orange; border-top: 1px solid black;"
            >Good Questions, Great Answers</em>
          </div>
        </div>
      </div>
      <div class="card p-2 w-100">
        <router-view />
        <hr />
        <div class="text-right p-2">
          <router-link :to="to">{{to.display}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  computed: {
    to() {
      return this.$route.name == "auth.login"
        ? { name: "auth.register", display: "Create an Account" }
        : { name: "auth.login", display: "Already Registered? Login." };
    }
  }
};
</script>



<style scoped>
body #app .navbar {
  display: none !important;
}
</style>
