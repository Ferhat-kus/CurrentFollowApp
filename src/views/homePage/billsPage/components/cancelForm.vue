<template>
      <form class="px-4 w-full flex flex-col justify-center ">
        <div class="flex flex-col items-center my-1">
          <descriptionInput label="Açıklama" />
        </div>
        <div class="w-full flex items-center justify-end ">
          <div
            class="flex w-full justify-end  my-2 md:justify-end items-center"
          >
            <Button
              :img-show="false"
              className="py-2 px-5 bg-red"
              :src="require('@/assets/icons/plus.svg')"
              to="#"
              title="İptal Et"
              @button-click="save"
            />
          </div>
        </div>
      </form>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Input from "@/components/input.vue";
import descriptionInput from "@/components/descriptionInput.vue";

export default {
  components: {
    Input,
    Button,
    descriptionInput,
  },
  methods: {
    close() {
      this.$emit("close"); 
    },
    save(){
      this.$emit("save");
    }
  },
};
</script>
