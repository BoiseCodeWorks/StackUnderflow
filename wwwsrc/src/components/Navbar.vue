<template>
  <nav class="navbar navbar-light border-bottom bg-white">
    <router-link class="navbar-brand" :to="{name: 'home'}">
      <img alt="StackUnderflow" width="180" src="../assets/logo.png" />
    </router-link>
    <div class="nav-right">
      <div class="text-muted d-flex align-items-center" v-if="user.id">
        <span class="pr-2 border-right">{{user.username}}</span>
        <i class="ml-2 fa fa-fw fa-th-large action" data-toggle="dropdown"></i>
        <div class="dropdown-menu dropdown-menu-right square" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item action" :to="{name:'tests'}">Tests</router-link>
          <div class="dropdown-divider"></div>
          <span class="dropdown-item action" @click="logout">logout</span>
        </div>
      </div>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
import { authService } from "../Auth/AuthService";
export default {
  name: "Navbar",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async logout() {
      await authService.logout();
    }
  }
};
</script>