<template>
  <form class="text-left" @submit.prevent="register()">
    <div class="form-group">
      <label for="username">Username:</label>
      <input
        autocomplete="username"
        type="text"
        v-model="newUser.username"
        placeholder="name"
        class="form-control"
      />
    </div>
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
    <button type="submit" class="btn btn-info my-2">Register</button>
  </form>
</template>

<script>
import { authService } from "./AuthService";
export default {
  name: "Register",
  data() {
    return {
      newUser: {
        email: "",
        password: "",
        username: ""
      }
    };
  },
  methods: {
    async register() {
      try {
        let user = await authService.register(this.newUser);
        this.$router.push("/");
      } catch (e) {
        toastError(e);
      }
    }
  }
};
</script>
