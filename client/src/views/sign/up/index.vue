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
      class="flex h-full flex-col items-center md:h-screen justify-center fixed z-10 top-1/3 left-1/2 -translate-y-1/3 -translate-x-2/4 w-full pt-4 px-8 pb-11 md:rounded-l-3xl bg-white text-center md:top-0 md:right-0 md:left-auto md:translate-x-0 md:translate-y-0 md:m-0 md:w-2/5"
    >
      <img
        class="w-72 aspect-auto my-7"
        src="../../../assets/logo-dark 1.png"
      />
      <h3 class="text-black mt-0 mx-0 mb-2 font-bold text-base">
        Lütfen Kayıt Olmak İçin Bilgilerinizi Giriniz
      </h3>
      <div class="w-full">
        <Form to="#" :user="user" @submit="createUser" />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "./components/signUpForm.vue";
import { api } from "@/plugins/axiosInstance.js";
import router from "@/router";

export default {
  name: "SignUp",
  components: {
    Form,
  },
  data() {
    return {
      user: {
        fullname: "",
        phoneNo: "",
        email: "",
        username: "",
        password: "",
        mission: "",
        authorityId: "1",
        companyId: "",
      },
      company: {
        name: "",
        addres: "",
        phoneNo: "",
        email: "",
        taxAddres: "",
        taxNo: "",
        companyType: "0",
      },
    };
  },
  mounted() {
    const localStorageUserToken = localStorage.getItem("userToken");
    const localStorageAuthorityId = localStorage.getItem("authorityId");
    if (
      !!localStorageUserToken &&
      !!localStorageAuthorityId
    ) {
      this.$store.commit("setUserToken", localStorageUserToken);
      this.$store.commit("setAuthorityId", localStorageAuthorityId);
      router.push({
        path: "/setup",
        name: "Setuppage",
      });
    } else {
      console.log("Giris yapilmamis kardesim tokenin yok");
    }
  },
  methods: {
    async createUser() {
      try {
        if (
          !this.user.fullname == "" ||
          !this.user.username == "" ||
          !this.user.email == "" ||
          !this.user.phoneNo == "" ||
          !this.user.mission == "" ||
          !this.user.password == ""
        ) {
          const response = await api().post("/auth/sign/up", this.user);
          const userToken = response.data.data.token;
          const authority = response.data.data.authorityId;
          if (userToken) {
            this.$store.commit("setUserToken", userToken);
            this.$store.commit("setAuthorityId", authority);
            const companyResponse = await api().post(
              "/company/add",
              this.company
            );
            const companyToken = companyResponse.data.data.token;
            this.$store.commit("setMyCompany", companyToken);
            if (companyToken) {
              localStorage.setItem("userToken", userToken);
              localStorage.setItem("authorityId", authority);
              router.push({
                path: "/setup",
                name: "Setuppage",
                params: { companyToken: companyToken },
              });
            } else {
              console.log("RESPONSTA HATA VAR ");
            }
          } else {
            console.log("store commit edilmedi");
          }
        } else {
          this.$swal({
            icon: "error",
            title: "Bi sorun oluştu",
            text: "Lütfen tüm alanları doldurun !",
          });
        }
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "Bi sorun oluştu",
          text: "Kullanıcı eklerken bir sorun oluştu lütfen tüm kutuların dolu ve doğru olduğundan emin olun !",
        });
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
