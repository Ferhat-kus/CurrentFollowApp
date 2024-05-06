<template>
  <div class="w-full flex flex-col items-start my-1">
    <label :for="label" class="block my-2 text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="relative w-full flex flex-col">
      <div class="flex">
        <div
          v-show="dropdownShow"
          @click="toggleDropdown"
          class="bg-darkGray rounded-l-md flex items-center px-4 w-auto font-semibold whitespace-nowrap"
        >
          {{ selectedOption }}
        </div>
        <input
          :id="label"
          :value="value"
          @input="updateValue($event.target.value)"
          :class="className"
          class="bg-lightGray w-full px-3 py-2 text-sm font-medium rounded-md focus:outline-none"
          :type="type"
          autocomplete="off"
          :placeholder="placeholder"
        />
      </div>

      <div
        v-show="dropdown"
        class="relative z-50 mt-1 md:w-3/12 w-4/12 bg-lightGray rounded-md shadow-lg whitespace-nowrap"
      >
        <ul>
          <li
            v-for="option in filteredOptions"
            :key="option"
            @click="selectOption(option)"
            class="py-1 px-2 hover:bg-darkGray cursor-pointer"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    className: String,
    dropdownShow: Boolean,
    value: String,
    placeholder: String,
  },
  data() {
    return {
      dropdown: false,
      selectedOption: "Aylık",
      options: ["Aylık", "Yıllık", "Tek Ödeme"],
    };
  },
  computed: {
    filteredOptions() {
      // Seçili seçeneği filtrele
      return this.options.filter((option) => option !== this.selectedOption);
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.dropdown = false;
    },
    updateValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
