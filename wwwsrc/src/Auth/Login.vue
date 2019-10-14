<template>
  <form class="text-left" @submit.prevent="login()">
    <div class="form-group">
      <label for="username">Email:</label>
      <input
        required
        type="email"
        autocomplete="email"
        v-model="newUser.email"
        placeholder="email"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="Password">Password:</label>
      <input
        required
        autocomplete="current-password"
        type="password"
        v-model="newUser.password"
        placeholder="password"
        class="form-control"
        minlength="6"
      />
    </div>
    <button type="submit" class="btn btn-info my-2">Login</button>
  </form>
</template>

<script>
import { authService } from "./AuthService";
import { toastError } from "../utils";
export default {
  name: "Login",
  data() {
    return {
      newUser: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        let user = await authService.login(this.newUser);
        this.$router.push("/");
      } catch (e) {
        toastError(e);
      }
    }
  }
};
</script>
