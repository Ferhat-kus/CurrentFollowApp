<template>
  <div>
    <form id="form" class="w-full flex flex-col justify-center">
      <div class="flex flex-col items-center">
        <Input v-model="login.username" label="Kullanıcı Adı" />
        <Input v-model="login.password" type="password" label="Şifre" />
      </div>
      <div class="my-3 w-full flex flex-col items-center">
        <div class="w-full">
          <Button
            className="py-2 "
            to="#"
            title="Giriş Yap"
            @button-click="submit"
          />
        </div>
        <router-link to="/" class="underline my-2"> Kayıt Ol </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Input from "@/components/input.vue";
export default {
  props: ["login"],
  components: {
    Input,
    Button,
  },
  methods: {
    submit() {
      if (!this.login.username || !this.login.password) {
        this.$swal({
          icon: "error",
          title: "Bi sorun oluştu",
          text: "Lütfen tüm alanları doldurun !",
        });
      } else {
        this.$emit("submit", this.login);
      }
    },
  },
};
</script>
