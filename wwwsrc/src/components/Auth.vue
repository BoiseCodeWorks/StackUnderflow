<template>
  <div class="row">
    <div class="col-12 col-sm-6 mx-auto">
      <div class="card p-3">
        <div class="d-flex" v-if="user.email">
          <h3 class="mr-2">Welcome, {{user.username}}</h3>
          <button @click="logout" class="btn text-info">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  data() {
    return {
      newAccount: false
    };
  }
};
</script>