<template>
  <div class="w-full">
    <label class="text-black font-semibold text-base">{{ label }}</label>
    <!-- İNPUT -->
    <input
      v-if="
        type !== 'select' &&
        type !== 'textarea' &&
        type !== 'multiSelect' &&
        type !== 'date' &&
        type !== 'inputSelect'
      "
      :type="type"
      v-model="Vmodel"
      class="bg-darkGray w-full flex rounded-md p-2 my-2 outline-none text-base text-black font-semibold"
      :placeholder="placeholder || 'customInput'"
    />
    <!-- SELECT -->
    <select
      v-if="type == 'select'"
      :type="type"
      v-model="Vmodel"
      @click="handleClick"
      class="bg-darkGray w-full flex rounded-md p-2 my-2 outline-none text-base text-black font-semibold"
    >
      <option value="" disabled>
        {{ placeholder || "Select Options" }}
      </option>
      <option v-for="(item, index) in options" :key="index" :value="item.title">
        {{ item.title }}
      </option>
    </select>
    <!-- TEXTAREA -->
    <textarea
      v-if="type === 'textarea'"
      :type="type"
      v-model="Vmodel"
      class="bg-darkGray w-full flex rounded-md p-2 my-2 outline-none text-base text-black font-semibold"
      :placeholder="placeholder || 'Text Area'"
    />
    <!-- DATE -->
    <input
      v-if="type === 'date'"
      :type="type"
      v-model="Vmodel"
      class="bg-darkGray w-full flex rounded-md p-2 my-2 outline-none text-base text-black font-semibold"
      :placeholder="placeholder || 'customDateInput'"
    />
    <!-- MultiSelect -->
    <multiselect
      v-if="type === 'multiSelect'"
      v-model="Vmodel"
      :value="options.title"
      :options="options"
      label="name"
      :optionHeight="30"
      selectLabel="Seç"
      selectedLabel="Seçili"
      deselectLabel="Kaldır"
      track-by="name"
      :show-labels="true"
      :placeholder="placeholder || 'MultiSelect'"
      class="w-full"
      :close-on-select="true"
      @close="isOpen = false"
      :searchable="false"
      remove-on-keydown="false"
    ></multiselect>

    <!-- İnput Select -->
    <div class="flex" v-if="type == 'inputSelect'">
      <select
        :type="type"
        class="bg-lightGray w-1/6 flex rounded-l-md p-2 my-2 outline-none text-base text-black font-semibold"
      >
        <option value="" disabled>
          {{ placeholder || "Select Options" }}
        </option>
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.title"
        >
          {{ item.title }}
        </option>
      </select>
      <input
        :type="type"
        v-model="Vmodel"
        class="bg-darkGray w-5/6 flex rounded-r-md p-2 my-2 outline-none text-base text-black font-semibold"
        :placeholder="placeholder || 'Select Input'"
      />
    </div>
    <!-- File Input -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      isOpen: false,
      Vmodel: this.value,
    };
  },
  props: {
    options: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: "input",
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Label",
    },
    multiselectDisabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
<style>
.multiselect__option {
  font-weight: 500;
}
.multiselect__placeholder {
  border-color: red;
  color: black;
  font-weight: 500;
  margin-bottom: 10px;
}
.multiselect__tags {
  padding-left: 6px;
  border: none;
  min-height: 30px;
  background-color: #ebebeb;
}
.multiselect__single {
  background-color: #ebebeb;
  color: black;
  font-weight: 500;
  min-height: 30px;
  margin-bottom: 0px;
}
.multiselect__option {
  color: black;
}
.multiselect__option:hover {
  color: black;
}
</style>
