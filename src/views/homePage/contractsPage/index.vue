<template>
  <div class="md:p-10">
    <pageTitle title="sözleşmeler" />
    <div class="md:my-7">
      <div
        class="w-full flex md:flex-row flex-col items-center justify-between"
      >
        <div class="md:w-1/12 w-full md:my-0 my-2">
          <Button
            :img-show="true"
            className="py-2"
            :src="require('@/assets/icons/plus.svg')"
            to="#"
            title="Ekle"
            @button-click="openModal('add')"
          />
        </div>
        <div class="flex md:flex-row flex-col items-center justify-between w-full md:w-6/12">
          <div class="md:mx-2 md:w-2/4 w-full my-1">
            <filterButton minInput="Min - Bakiye" maxInput="Max - Bakiye" />
          </div>
          <div class="w-full my-1">
            <searchInput />
          </div>
        </div>
      </div>
      <Table
        :headercolumns="[
          '#',
          'BAŞLANGIÇ TARİHİ',
          'bitiş tarihi',
          'konusu',
          'sözleşme bedeli',
          '',
        ]"
        :bodycolumns="contract"
        @row-clicked="openModal('detail')"
        @detail-clicked="openModal('detail')"
      />
      <customModal
        :header-title="modalTitle"
        ref="modalComponent"
        name="add"
      >
        <template v-slot:form>
          <contractModalForm :reviewButton="reviewButton" />
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
import contractModalForm from "./components/contractModalForm.vue";
import customModal from "@/components/customModal.vue";
import { api } from "@/plugins/axiosInstance.js";
export default {
  components: {
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
      contract: [],
      modalTitle: "",
      reviewButton: "",
    };
  },
  created() {
    this.getContract();
  },
  methods: {
    async getContract() {
      try {
        const response = await api().get("/contracts");
        this.contract = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    openModal(action) {
      if (action === "add") {
        this.modalTitle = "Sözleşme Ekle";
        this.reviewButton = false;
      } else if (action === "detail") {
        this.modalTitle = "Sözleşme Detayları";
        this.reviewButton = true;
      }
      this.$refs.modalComponent.show("add");
    },
    closeModal() {
      this.$refs.modalComponent.hide("add");
    },
  },
};
</script>
