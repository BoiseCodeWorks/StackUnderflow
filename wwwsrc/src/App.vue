<template>
  <div id="app">
    <navbar />
    <router-view />
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
.action{
  filter: brightness(.8);
  transition: all .3s linear;
  cursor: pointer;
}
.action:hover {
  filter: brightness(1);
}
.square{
  border-radius: 0;
}
</style>