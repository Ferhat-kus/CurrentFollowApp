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
};
</script>
