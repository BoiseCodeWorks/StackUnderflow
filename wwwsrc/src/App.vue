<template>
  <div id="app">
    <navbar />
    <div class="home container-fluid" style="min-height: calc(98vh - 60px)">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: { Navbar }
};
</script>

<style>
body {
  background-color: whitesmoke;
  font-family: "Roboto";
}
.action {
  filter: brightness(0.8);
  transition: all 0.3s linear;
  cursor: pointer;
}
.action:hover {
  filter: brightness(1);
}
.square {
  border-radius: 0;
}
</style>