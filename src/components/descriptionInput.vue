<template>
  <div class="w-full flex flex-col mx-2">
    <label for="inputField" class="block my-2 text-sm font-medium text-gray-700">{{ label }}</label>
    <textarea
      id="inputField"
      class="bg-lightGray resize-none h-[100px] w-full px-3 py-2 text-sm font-medium rounded-md focus:outline-none"
      :type="type"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
  },
};
</script>
