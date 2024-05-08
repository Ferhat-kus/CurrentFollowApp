<template>
  <div class="px-4 flex w-full flex-col items-center">
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Input v-model="user.name" placeholder="Ferhat" label="Adı" />
      </div>
      <div class="w-1/2 ml-2">
        <Input v-model="user.surname" placeholder="kuş" label="Soyadı" />
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Input v-model="user.phoneNo" placeholder="05555555555" label="Telefon No" />
      </div>
      <div class="w-1/2 ml-2">
        <Input
          v-model="user.email"
          placeholder="55ferhat.kus@gmail.com"
          label="Mail"
        />
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Input
          v-model="user.username"
          placeholder="ferhatkus"
          label="Kullanıcı Adı"
        />
      </div>
      <div class="w-1/2 ml-2">
        <Input v-model="user.password" type="password" label="Sifre" />
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Dropdown
          v-model="user.authorityId"
          label="Yetki"
          @selected-value="updateUserAuthority"
          :multiselect-disabled="false"
        />
      </div>
      <div class="w-1/2 ml-2">
        <Input required v-model="user.mission" placeholder="Muhasebe" label="Görevi" />
      </div>
    </div>
    <div
      class="md:flex md:flex-row flex flex-col w-full items-center justify-between my-2"
    >
      <div
        class="md:flex md:justify-end w-full justify-center items-center md:my-0 my-7"
      >
        <Button
          :img-show="false"
          className="py-2 px-4 "
          :src="require('@/assets/icons/plus.svg')"
          to="#"
          title="kaydet"
          @button-click="save"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Input from "@/components/input.vue";
import Dropdown from "@/components/dropdown.vue";
export default {
  props:["user"],
  components: {
    Input,
    Button,
    Dropdown,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
    updateUserAuthority(selectedAuthority, id) {
      this.user.authorityId = id;
    },
  },
};
</script>

<style></style>
