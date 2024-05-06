<template>
  <div class="">
    <div class="relative">
      <!-- Dropdown toggle button -->
      <button
        @click="show = !show"
        class="flex w-full items-center justify-between p-2 px-4 text-darkBlue bg-white rounded-md border-2 border-darkBlue"
      >
        <span class="mr-4 font-semibold">Filtrele</span>
        <svg
          class="w-5 h-5 text-darkBlue"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div
        v-show="show"
        @click="show = !show"
        class="flex justify-center items-center opacity-50 fixed inset-0 z-40"
      ></div>

      <div
        v-show="show"
        class="absolute z-50 w-full flex flex-col items-center right-0 p-2 mt-1 bg-white border-2 border-darkBlue rounded-md shadow-xl"
      >
          <maxAndMinRangeInput :placeholder="minInput" />
          <maxAndMinRangeInput :placeholder="maxInput" />
        <button
          @click="show = !show"
          class="flex w-full px-2 py-2 text-base justify-center items-center font-semibold bg-darkBlue text-titleTextColor rounded-md"
        >
          Filtrele
        </button>
      </div>
      <div
        v-show="usersFilterShow"
        class="absolute z-50 w-full flex flex-col items-center right-0 p-1 mt-1 bg-white border-2 border-darkBlue rounded-md shadow-xl"
      ></div>
    </div>
  </div>
</template>
<script>
import maxAndMinRangeInput from "./components/maxAndMinRangeInput.vue";
export default {
  props: ["maxInput", "minInput", "usersFilterShow"],
  components: {
    maxAndMinRangeInput,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
