<template>
  <div class="md:p-10">
    <pageTitle title="Kullanıcılar" />
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
            @button-click="openUserAddModal('add')"
          />
        </div>
        <div
          class="flex md:flex-row flex-col items-center justify-between w-full md:w-6/12"
        >
          <div class="md:mx-2 md:w-2/4 w-full my-1">
            <filterButton
              :users-filter-show="usersFilterShow"
              minInput="Min - Bakiye"
              maxInput="Max - Bakiye"
            />
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
          'adı',
          'kullanıcı adı',
          'mail',
          'tel. no.',
          'görevi',
          'Yetki',
          '',
        ]"
        :bodycolumns="filteredUsers"
        @row-clicked="openUserAddModal('detail')"
        @detail-clicked="openUserAddModal('detail')"
      />
      <customModal :header-title="modalTitle" ref="usersAddModal" name="user">
        <template v-slot:form>
          <userForm />
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
import userForm from "./components/userForm.vue";
import { api } from "@/plugins/axiosInstance.js";

export default {
  components: {
    pageTitle,
    Table,
    Button,
    searchInput,
    filterButton,
    customModal,
    userForm,
  },
  data() {
    return {
      users: [],
      modalTitle: "Kullanıcı Ekle",
      usersFilterShow: false,
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
  
    filteredUsers() {
      return this.users.map((user) => {
        const { id ,password, companyId, authorityId, ...filteredUser } = user;
        return {
          ...filteredUser,
          authority: this.getAuthorityText(user.authorityId),
        };
      });
    },
  },
  methods: {
    async getUsers() {
      try {
        const response = await api().get("/users/users");
        this.users = response.data.data.users;
      } catch (error) {
        console.error(error);
      }
    },
    openUserAddModal(action) {
      this.modalTitle =
        action === "add" ? "Kullanıcı Ekle" : "Kullanıcı Detayları";
      this.$refs.usersAddModal.show("user");
    },
    closeUserAddModal() {
      this.$refs.usersAddModal.hide("user");
    },
    getAuthorityText(authorityId) {
      switch (authorityId) {
        case "1":
          return "Kurucu";
        case "2":
          return "Yönetici";
        case "3":
          return "Kullanıcı";
        default:
          return "Bilinmeyen Yetki";
      }
    },
  },
};
</script>
