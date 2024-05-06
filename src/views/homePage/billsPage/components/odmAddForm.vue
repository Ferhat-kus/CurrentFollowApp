<template>
      <form class="w-full px-4 flex flex-col">
        <div class="flex flex-col items-center w-full">
          <Input placeholder="01/01/2024" label="Ödeme Tarihi" />
          <Input placeholder="1000 TL" label="Ödeme Tutarı" />
          <descriptionInput label="Açıklama" />
        </div>
        <div class="flex items-center justify-start md:justify-end md:px-2 px-0 my-2">
          <div
            class="md:flex w-full justify-start   md:justify-end md:items-center "
          >
            <Button
              :img-show="false"
              className="py-2 px-5 md:mx-2"
              :src="require('@/assets/icons/plus.svg')"
              to="#"
              title="Kaydet"
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
