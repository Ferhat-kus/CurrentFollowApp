<template>
  <div class="md:p-10">
    <div
      class="flex justify-center items-center bg-slate-200 opacity-40 fixed inset-0 z-40"
    ></div>

    <div class="relative z-50">
      <Form @submit="updateCompany" :myCompany="company" to="#"  />
    </div>
  </div>
</template>

<script>
import Button from "@/components/customButton/customButton.vue";
import Form from "@/components/form.vue";
import { api } from "@/plugins/axiosInstance.js";
import store from "@/store";

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
    };
  },
  mounted() {
    this.getCompany();
  },
  methods: {
    async getCompany() {
      try {
        const response = await api().get("/company/companyget", this.company);
        // this.company = response.data.data;
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.company);
      } catch (error) {
        console.error("Error fetching company information:", error);
      }
    },
    async updateCompany() {
      try {
        const response = await api().post("/company/companyBring",{
          name: this.company.name,
          addres: this.company.addres,
          phoneNo: this.company.phoneNo,
          email: this.company.email,
          taxAddres: this.company.taxAddres,
          taxNo: this.company.taxNo,
          companyType: "1",
        });
        this.$router.push({path: '/companies'})
        console.log("SetupPAgeCompanyresponse", response.data.data);
      } catch (error) {
        console.log("Catch Hatası" , error);
      }
    }
  },
};
</script>
