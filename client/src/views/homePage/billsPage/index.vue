<template>
  <div class="md:p-10">
    <pageTitle title="FATURALAR" />
    <div class="md:my-7">
      <div
        class="w-full flex md:flex-row flex-col items-center justify-between"
      >
        <div class="md:w-1/4 w-full flex items-center md:my-0 my-2 justify-between ">
          <div class="md:w-full w-2/3 mr-2 ">
            <Button
              :img-show="true"
              className="py-2"
              :src="require('@/assets/icons/plus.svg')"
              to="#"
              title="Ekle"
              @button-click="openModal('add')"
            />
          </div>
          <div class="md:w-full w-2/3 ">
            <Button
              :img-show="true"
              icon-class="mr-2"
              className="py-2"
              :src="require('@/assets/icons/plus.svg')"
              to="#"
              title="ODM Ekle"
              @button-click="openOdmModalComponent"
            />
          </div>
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
        :show="true"
        :headercolumns="[
          '#',
          'fatura tutarı',
          'fatura no',
          'fatura tarihi',
          'ödeme tarihi',
          '',
        ]"
        :bodycolumns="bills"
        @row-clicked="openModal('detail')"
        @detail-clicked="openModal('detail')"
        @delete-clicked="openCancelModalComponent"
      />
      <!-- Fatura Ekle -->
      <customModal :header-title="modalTitle" ref="modalComponent" name="add">
        <template v-slot:form>
          <billsForm />
        </template>
      </customModal>
      <!-- İptal Modal -->
      <customModal header-title="İptal Nedeni" ref="cancelModalComponent" name="cancel">
        <template v-slot:form>
          <cancelForm />
        </template>
      </customModal>
      <!-- Ödeme Modal -->
      <customModal header-title="Ödeme Ekle" ref="odmModalComponent" name="odm">
        <template v-slot:form>
          <odmAddForm />
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
import customModal from "@/components/customModal.vue";
import billsForm from "./components/billsForm.vue";
import odmAddForm from "./components/odmAddForm.vue";
import cancelForm from "./components/cancelForm.vue";
import { api } from "@/plugins/axiosInstance";
export default {
  components: {
    pageTitle,
    Table,
    Button,
    searchInput,
    filterButton,
    customModal,
    odmAddForm,
    billsForm,
    cancelForm,
  },
  data() {
    return {
      modalTitle: "",
      bills: [],
    };
  },
  created() {
    this.getBills();
  },
  methods: {
    async getBills() {
      try {
        const response = await api().get("/bills");
        this.bills = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    openModal(action) {
      if (action === "add") {
        this.modalTitle = "Fatura Ekle";
      } else if (action === "detail") {
        this.modalTitle = "Fatura Detayları";
      }
      this.$refs.modalComponent.show("add");
    },
    closeModal() {
      this.$refs.modalComponent.hide("add");
    },
    openOdmModalComponent() {
      this.$refs.odmModalComponent.show("odm");
    },
    closeOdmModalComponent() {
      this.$refs.odmModalComponent.hide("odm");
    },
    openCancelModalComponent() {
      this.$refs.cancelModalComponent.show("cancel");
    },
    closeCancelModalComponent() {
      this.$refs.cancelModalComponent.hide("cancel");
    },
  },
};
</script>
