<template>
  <div class="md:p-10">
    <div >
      <pageTitle title="AYARLAR" />
    </div>
    <div class="w-full md:my-7">
      <Form :myCompany="myCompany" to="#"  />
    </div>
  </div>
</template>

<script>
import pageTitle from "@/components/pageTitle.vue";
import Form from "@/components/form.vue";
import router from "@/router";
import { api } from "@/plugins/axiosInstance";
export default {
  components: {
    pageTitle,
    Form,
  },
  data() {
    return {
      myCompany: {
        companyName: "",
        companyAdress: "",
        taxAddress: "",
        taxNo: "",
        phoneNumber: "",
        email: "",
      },
    };
  },
  // async created() {
  //   await this.getMyCompany();
  // },
  // methods: {
  //   async getMyCompany() {
  //     const id = this.$store.state.myCompanyId;
  //     try {
  //       const response = await api().get(`${"/myCompanies"}/${id}`);
  //       this.myCompany = response.data;
  //     } catch (error) {
  //       if (error.response) {
  //         console.error("Sunucu Hatası:", error.response.data);
  //       } else if (error.request) {
  //         console.error("İstek Hatası:", error.request);
  //       } else {
  //         console.error("Hata:", error.message);
  //       }
  //     }
  //   },
  //   async updateMyCompany() {
  //     const id = this.$store.state.myCompanyId;
  //     try {
  //       await api().put(`${"/myCompanies"}/${id}`, {
  //         companyName: this.myCompany.companyName,
  //         companyAdress: this.myCompany.companyAdress,
  //         taxAddress: this.myCompany.taxAddress,
  //         taxNo: this.myCompany.taxNo,
  //         phoneNumber: this.myCompany.phoneNumber,
  //         email: this.myCompany.email,
  //       });
  //       alert("Success!");
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   },
  // },
};
</script>
