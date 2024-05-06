<template>
  <div>
    <customInput :options="options" type="inputSelect" v-model="value" />
    <customButton @click="alert" />
  </div>
</template>

<script>
import customInput from "@/components/customInput/customInput.vue";
import customButton from "@/components/customButton/customButton.vue";
import { api } from '../plugins/axiosInstance.js';
export default {
  components: {
    customButton,
    customInput,
  },
  data() {
    return {
      options: [],
      value: ""
    };
  },
  created() {
    this.get();
  },
  methods: {
    async get() {
      try {
        const response = await api().get("/posts");
        this.options = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    alert() {
      setTimeout(() => {
        alert("Vmodel: " + this.value);
      }, 500);
    },
  },
};
</script>
