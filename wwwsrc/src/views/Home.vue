<template>
  <div class="home container-fluid" style="min-height: calc(98vh - 60px)">
    <div class="main-content">
      <questions />
    </div>
  </div>
</template>

<script>
import Questions from "@/components/Questions.vue";

export default {
  name: "home",
  components: {
    Questions
  }
};
</script>