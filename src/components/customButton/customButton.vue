<template>
  <div>
    <button
      @click="click"
      :type="type"
      :class="[className,loading ? 'bg-opacBlue' : 'bg-darkBlue']"
      class="text-white bg-darkBlue hover:bg-opacBlue w-full p-2 px-5 rounded-md flex items-center justify-center text-base"
    >
      <span v-if="loading" class="flex items-center justify-center">
        <i class="bx bx-loader-alt text-base font-bold animate-spin mr-2"></i
        >
        <span class="font-semibold text-base"> Yükleniyor...</span>
      </span>
      <span v-else v-show="iconShow" 
      class="flex items-center justify-center">
        <i class="bx bx-plus text-base font-bold  mr-2"></i>
      </span>

      <span class="text-base font-semibold whitespace-nowrap" v-if="!loading">{{ title }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props:{
    type: {
      type: String,
      default: "button",
    },
    title: {
      type: String,
      default: "Button Title",
    },
    className: {
      type: String,
      default: "",
    },
    iconShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    click() {
      this.loading = true;
      this.$emit("button-click");
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
};
</script>
