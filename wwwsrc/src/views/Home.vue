<template>
  <div>
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