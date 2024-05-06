<template>
        <!-- Form -->
        <div class=" flex flex-col w-full px-4 items-center">
          <div class="flex flex-col w-full  items-center justify-center ">
            <Input placeholder="Sirius" label="Şirket Adı" />
            <Input placeholder="01/01/2020" label="Fatura Tarihi" />
            <Input placeholder="123456789012" label="Fatura No" />
            <descriptionInput label="Acıklama" />
          </div>
          <div class="flex  w-full justify-between ">
            <div class="w-1/2 mr-2">
            <Input placeholder="1000 TL" label="Fatura Tutarı" />
          </div>
          <div class="w-1/2 ml-2">
            <Input placeholder="01/01/2025" label="Son Ödeme Tarihi" />
          </div>
          </div>
          <div class="flex w-full bg-red items-center justify-end my-2">
          <div
            class="md:flex w-full justify-end  bg-gray-50  md:justify-end items-center "
          >
            <Button
              :img-show="false"
              className="py-2 px-5"
              :src="require('@/assets/icons/plus.svg')"
              to="#"
              title="Kaydet"
              @button-click="save"
            />
          </div>
        </div>
        </div>
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
      save() {
        this.$emit("save");
      },
    },
  };
  </script>
  