<template>
  <div
    id="bg"
    class="flex flex-col md:justify-center items-center fixed inset-0 m-0 h-screen font-bold bg-[#044DB9] text-black md:p-0"
  >
    <div
      class="flex flex-col text-center max-md:text-left px-8 w-11/12 max-md:w-full"
    >
      <h1
        class="text-center md:text-left text-5xl md:text-6xl my-5 text-white font-extrabold"
      >
        Cari Takip
      </h1>
      <p class="text-center md:text-left text-white font-semibold text-xl">
        Cari Takip ile şirketinizin cari işlemlerini kontrol edebilirsiniz
      </p>
    </div>
    <!-- Login -->
    <div
      id="login"
      class="flex flex-col items-center md:h-screen h-full justify-center fixed z-10 top-1/3 left-1/2 -translate-y-1/3 -translate-x-2/4 w-full pt-4 px-8 pb-11 bg-white text-center md:top-0 md:right-0 md:left-auto md:translate-x-0 md:translate-y-0 md:m-0 md:w-2/5 md:rounded-tl-3xl md:rounded-bl-3xl"
    >
      <img
        class="w-72 aspect-auto my-7"
        src="../../../assets/logo-dark 1.png"
      />
      <h3 class="text-black mt-0 mx-0 mb-2 font-bold text-base">
        Lütfen Giriş Yapmak İçin Bilgilerinizi Giriniz
      </h3>
      <div class="w-full">
        <Form :login="login" @submit="signIn" />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "./components/signInForm.vue";
import { api } from "@/plugins/axiosInstance";
import router from "@/router";
export default {
  name: "SignUp",
  components: {
    Form,
  },
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    const localStorageUserToken = localStorage.getItem("userToken");
    const localStorageCompanyToken = localStorage.getItem("companyToken");
    const localStorageAuthorityId = localStorage.getItem("authorityId");
    if (
      !!localStorageUserToken &&
      !!localStorageCompanyToken &&
      !!localStorageAuthorityId
    ) {
      console.log("ssssssssssssssss");
    } else {
      console.log("SignInPage");
    }
  },
  methods: {
    async signIn() {
      try {
        const response = await api().post("/auth/sign/in", {
          username: this.login.username,
          password: this.login.password,
        });
        const code = response.data.code;
        const userToken = response.data.data.token;
        const companyToken = response.data.data.token;
        const authorityId = response.data.data.authorityId;
        this.$store.commit("setSignInCode", code);
        this.$store.commit("setUserToken", userToken);
        this.$store.commit("setMyCompany", companyToken);
        this.$store.commit("setAuthorityId", authorityId);
        this.$router.push({
          name: "Companies",
          path: "/companies",
        });
      } catch (error) {
        if (error.response.status === 404) {
          this.$swal({
            icon: "error",
            title: "Kullanıcı Bulunamadı",
            text: "Böyle bir kullanıcı bulunamadı. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.",
          });
        } else if (error.response.status === 401) {
          this.$swal({
            icon: "error",
            title: "Bi sorun oluştu",
            text: "Şifreniz Yanlış !",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
#bg {
  background-image: url("../../../assets/Cari-Hesapbg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  animation: rotate 5s infinite alternate linear;
}
</style>
