<template>
  <div class="categories">
    <div class="m-3 d-flex align-items-center flex-wrap">
      <div class="border bg-white rounded p-1 mr-1">
        <small class="mr-1">Categories:</small>
        <small class="action text-muted" @click="select({name:''})">
          <i class="fa fa-fw fa-times ml-1"></i>
        </small>
      </div>
      <div
        class="border rounded action p-1 mr-1"
        v-for="q in categories"
        :key="q.id"
        @click="select(q)"
      >
        <small class="mr-1">{{q.name}}</small>
      </div>
      <div class="border rounded action p-1" @click="addCategory">
        <small class="mr-1">
          <i class="fa fa-plus-square action mr-1"></i>
          <span>New</span>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../utils";
import Swal from "sweetalert2";

export default {
  async mounted() {
    try {
      let res = await api.get("categories");
      this.$store.commit("setResource", {
        resource: "categories",
        data: res.data
      });
    } catch (e) {}
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    async addCategory() {
      Swal.mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1"]
      })
        .queue(["Create a new Category"])
        .then(async result => {
          if (result.value) {
            let res = await api.post("categories", {
              name: result.value[0]
            });
            this.$store.commit("setResource", {
              resource: "categories",
              data: [...this.categories, res.data]
            });
          }
        });
    },
    select(c) {
      this.$emit("selected", c.name);
    }
  }
};
</script>