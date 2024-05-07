<template>
  <div class="md:p-10">
    <div
      class="flex justify-center items-center bg-slate-200 opacity-40 fixed inset-0 z-40"
    ></div>
    <h3 class="text-black mt-0 mx-0 mb-2 font-bold text-base">
      Lütfen Kayıtdınızı Tamamlamak İçin Kurulumu Bitirin.
    </h3>
    <div class="relative z-50">
      <Form @submit="updateCompany" :myCompany="company" to="#" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Form from "@/components/form.vue";
import { api } from "@/plugins/axiosInstance.js";
export default {
  components: {
    Button,
    Form,
  },
  data() {
    return {
      company: {
        name: "",
        addres: "",
        phoneNo: "",
        email: "",
        taxAddres: "",
        taxNo: "",
      },
      storageToken: localStorage.getItem("userToken"),
    };
  },
  mounted() {
    if (this.storageToken) {
      this.getCompany();
    } else {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    async getCompany() {
      try {
        const response = await api().get("/company/companyget", this.company);
      } catch (error) {
        console.log(error);
      }
    },
    async updateCompany() {
      try {
        if (
          !this.company.name == "" ||
          !this.company.addres == "" ||
          !this.company.phoneNo == "" ||
          !this.company.email == "" ||
          !this.company.taxAddres == "" ||
          !this.company.taxNo == ""
        ) {
          const response = await api().post("/company/companyBring", {
            name: this.company.name,
            addres: this.company.addres,
            phoneNo: this.company.phoneNo,
            email: this.company.email,
            taxAddres: this.company.taxAddres,
            taxNo: this.company.taxNo,
            companyType: "1",
          });
          this.$router.push({ path: "/companies" });
          console.log("SetupPAgeCompanyresponse", response.data.data);
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
          text: "Lütfen Firma Bilgilerinii Doğru Giriniz",
        });
        console.log("Catch Hatası", error);
      }
    },
  },
};
</script>
