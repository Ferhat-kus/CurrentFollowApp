<template>
  <form
    @submit.prevent="submitForm"
    class="px-4 w-full flex flex-col md:my-0 my-3 items-center justify-center"
  >
    <div
      class="flex w-full md:flex-row flex-col md:my-0 items-center justify-center">
      <div class="md:md:w-1/2 w-full md:mr-2">
        <Input v-model="company.name" placeholder="Sirius" label="Firma Ünvanı" />
      </div>
      <div class="md:w-1/2 w-full md:ml-2">
      <Input v-model="company.addres" placeholder="barbaros hayrettin paşa" label="Firma Adresi" />
    </div>
    </div>
    <div
      class="flex w-full md:flex-row flex-col md:my-0 items-center justify-center"
    >
    <div class="md:w-1/2 w-full md:mr-2">
      <Input v-model="company.phoneNo" placeholder="05555555555" label="Telefon No" />
    </div>
    <div class="md:w-1/2 w-full md:ml-2">
      <Input v-model="company.email" placeholder="siriustedarik6654@gmail.com" label="Mail" />
    </div>
    </div>
    <div
      class="flex w-full md:flex-row flex-col md:my-0 items-center justify-center"
    >
    <div class="md:w-1/2 w-full md:mr-2">
      <Input v-model="company.taxAdres" placeholder="Esenyurt" label="Vergi Adresi" />
    </div>
    <div class="md:w-1/2 w-full md:ml-2">
      <Input v-model="company.taxNo" placeholder="123456" label="Vergi No" />
    </div>
    </div>
    <div
      class="md:flex flex md:flex-row flex-col w-full items-center justify-between md:my-2"
    >
      <div class="md:w-5/12 w-full md:my-0 my-2 px-0">
        <Button
          :img-show="false"
          className="py-2 px-5 whitespace-nowrap bg-opacBlue"
          :src="require('@/assets/icons/plus.svg')"
          to="#"
          title="Sözleşme Ekle"
          @button-click="contractAdd"
        />
      </div>
      <div
        class="md:flex md:justify-end w-full justify-center items-center px-0"
      >
        <Button
          type="submit"
          :img-show="false"
          className="py-2 md:my-0  "
          :src="require('@/assets/icons/plus.svg')"
          to="#"
          title="kaydet"
          @button-click="save"
        />
      </div>
    </div>
  </form>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Input from "@/components/input.vue";

export default {
  props: ["company", "submitForm"],
  components: {
    Button,
    Input,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
    contractAdd() {
      this.$emit("contractAdd", true);
    },
  },
};
</script>
