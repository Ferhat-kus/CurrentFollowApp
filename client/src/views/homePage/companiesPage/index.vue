<template>
  <div class="md:p-10">
    <pageTitle title="FİRMALAR" />
    <div class="md:my-7">
      <div
        class="w-full flex md:flex-row flex-col items-center justify-between"
      >
        <div class="md:w-1/12 w-full md:my-0 my-2">
          <Button
            :img-show="true"
            :src="require('@/assets/icons/plus.svg')"
            to="#"
            title="Ekle"
            className="py-2"
            @button-click="openModal('add')"
          />
        </div>
        <div
          class="flex md:flex-row flex-col items-center justify-between w-full md:w-6/12"
        >
          <div class="md:mx-2 md:w-2/4 w-full my-1">
            <filterButton minInput="Min - Bakiye" maxInput="Max - Bakiye" />
          </div>
          <div class="w-full my-1">
            <searchInput />
          </div>
        </div>
      </div>
      <Table
        :show="false"
        :headercolumns="[
          '#',
          'firma adı',
          'telefon no',
          'mail',
          'vergi no',
          'bakiye',
          '',
        ]"
        :bodycolumns="filteredCompanies"
        @row-clicked="detail"
        @detail-clicked="openModal('detail')"
      />
      <!-- modals -->
      <customModal :header-title="modalTitle" ref="modalComponent" name="add">
        <template v-slot:form>
          <companiesModal
            :company="company"
            @contractAdd="openModal('contract')"
            @save="saveCompany"
          />
        </template>
      </customModal>
      <customModal
        :header-title="modalTitle"
        ref="contractModalComponent"
        name="contractAdd"
      >
        <template v-slot:form>
          <contractModalForm />
        </template>
      </customModal>
    </div>
  </div>
</template>

<script>
import pageTitle from "@/components/pageTitle.vue";
import Button from "@/components/customButton/customButton.vue";
import searchInput from "@/components/searchInput.vue";
import filterButton from "@/components/filterButton/filterButton.vue";
import Table from "@/components/table.vue";
import companiesModal from "./components/companiesModal.vue";
import customModal from "@/components/customModal.vue";
import contractModalForm from "../contractsPage/components/contractModalForm.vue";
import { api } from "@/plugins/axiosInstance.js";

export default {
  components: {
    companiesModal,
    pageTitle,
    Table,
    Button,
    searchInput,
    filterButton,
    customModal,
    contractModalForm,
  },
  data() {
    return {
      modalTitle: "",
      companies: [],
      company: {
        name: "",
        addres: "",
        phoneNo: "",
        email: "",
        taxAddres: "",
        taxNo: "",
        companyType: "",
        // balance: "",
      },
    };
  },
  computed: {
    filteredCompanies() {
      return this.companies.map(
        ({ id, taxAddres, companyType, ...filteredCompany }) => filteredCompany
      );
    },
  },
  mounted() {
    this.fetchCompanies();
  },
  methods: {
    async fetchCompanies() {
      try {
        const response = await api().get("/company/companies");
        this.companies = response.data.data.company;
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    async saveCompany() {
      try {
        const response = await api().post("/company/add", this.company);
        console.log("Company added:", response.data);
        this.closeModal();
      } catch (error) {
        console.error("Error adding company:", error);
      }
    },
    openModal(action) {
      if (action == "add") {
        this.modalTitle = "Firma Ekle";
        this.company = {
          name: "",
          addres: "",
          phoneNo: "",
          email: "",
          taxAddres: "",
          taxNo: "",
          companyType: "1",
          // balance: "",
        };
      } else if (action == "detail") {
        this.modalTitle = "Firma Detayları";
      } else if (action == "contract") {
        this.$refs.contractModalComponent.show("contractAdd");
        this.modalTitle = "Sözleşme Ekle";
      }
      this.$refs.modalComponent.show("add");
    },
    closeModal() {
      this.fetchCompanies();
      this.$refs.modalComponent.hide("add");
      this.$refs.contractModalComponent.hide("contractAdd");
    },
    detail() {
      if (this.$route.path !== "/bills") {
        this.$router.push("/bills");
      }
    },
  },
};
</script>
