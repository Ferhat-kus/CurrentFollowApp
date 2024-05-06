<template>
  <div class="flex justify-between mt-2">
    <div>Toplam {{ totalPages }} sayfa var</div>
    <div class="flex">
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded-l-md text-white bg-opacBlue hover:text-white"
      >
        <img src="@/assets/icons/leftarrow.svg" alt="" />
      </button>
      <button
        v-for="pageNumber in totalPages ? totalPages : '0'"
        :key="pageNumber"
        @click="setCurrentPage(pageNumber)"
        :class="{ 'bg-darkBlue text-white': pageNumber === currentPage }"
        class="px-3 py-1 bg-[#7d85c5] hover:bg-darkBlue text-white"
      >
        {{ pageNumber }}
      </button>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-r-md bg-opacBlue hover:text-white"
      >
        <img src="@/assets/icons/rightarrow.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPreviousPage() {
      this.$emit("goToPreviousPage");
    },
    goToNextPage() {
      this.$emit("goToNextPage");
    },
    setCurrentPage(pageNumber) {
      this.$emit("setCurrentPage", pageNumber);
    },
  },
};
</script>