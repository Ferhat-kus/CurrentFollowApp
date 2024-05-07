<template>
  <form id="form" class="w-full flex flex-col items-center justify-between">
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Input v-model="user.fullname" label="Ad ve Soyad" />
      </div>
      <div class="w-1/2 ml-2">
        <Input v-model="user.mission" label="Görevi" />
      </div>
      <!-- <div class="w-1/2 ml-2">
        <Input v-model="user.surname" label="Soyadı" />
      </div> -->
    </div>
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Input type="email" v-model="user.email" label="Mail" />
      </div>
      <div class="w-1/2 ml-2">
        <Input v-model="user.phoneNo" label="Telefon" />
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/2 mr-2">
        <Input v-model="user.username" label="Kullanıcı Adı" />
      </div>
      <div class="w-1/2 ml-2">
        <Input v-model="user.password" type="password" label="Şifre" />
      </div>
      <!-- <div class="w-1/2 ml-2">
        <Input v-model="user.mission" label="Görevi" />
      </div> -->
    </div>
    <!-- <div class="flex w-full">
      
      <div class="w-1/2 ml-2">
        <Dropdown
          :selectedValue="user.authorityId"
          label="Yetki"
          @selected-value="updateUserAuthority"
        />
      </div>
    </div> -->
    <div class="my-3 w-full flex flex-col items-center">
      <router-link to="/signin" class="underline my-2">Giriş Yap</router-link>
      <div class="w-full">
        <Button
          @button-click="submit"
          :to="to"
          className="py-2"
          title="Kayıt Ol"
        />
      </div>
    </div>
  </form>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Input from "@/components/input.vue";
import Dropdown from "@/components/dropdown.vue";

export default {
  props: ["user", "to"],
  components: {
    Input,
    Button,
    Dropdown,
  },
  data() {
    return {
      isValidEmail: true,
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.user);
    },
    updateUserAuthority(selectedAuthority, id) {
      this.user.authorityId = id;
    },
  },
};
</script>
