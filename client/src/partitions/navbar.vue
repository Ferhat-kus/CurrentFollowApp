<template>
  <main class="" :class="!isShow ? 'w-full' : 'w-full '">
    <div class="h-[50px] bg-lightBlue flex items-center">
      <div class="flex justify-between w-full">
        <div class="flex items-center space-x-2">
          <div
            class="h-[50px] flex items-center px-4 hover:bg-opacBlue cursor-pointer text-titleTextColor"
            @click="toggleMenu"
          >
            <i
              :class="
                isShow
                  ? 'bx bx-left-indent text-3xl'
                  : 'bx bx-right-indent text-3xl'
              "
            ></i>
          </div>
          <span class="text-md font-semibold capitalize text-titleTextColor"
            >Merhaba {{ userName }}</span
          >
        </div>
      </div>
    </div>
    <div class="p-2 h-[calc(100vh-50px)]">
      <slot name="routerView" class="h-full p-1"> </slot>
    </div>
  </main>
</template>

<script>
import { api } from "@/plugins/axiosInstance.js";

export default {
  props: {
    isShow: Boolean,
  },
  data() {
    return {
      userName: "",
    };
  },
  created() {
    this.fetchUserName();
  },
  watch: {
    '$route.path'(newPath, oldPath) {
      if (newPath === '/companies') {
        this.fetchUserName();
      } else {
        console.log("ssssssssssssssss");
      }
    }
  },
  methods: {
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    async fetchUserName() {
      if (
        this.$store.state.userToken !== null &&
        this.$store.state.myCompanyToken !== null &&
        this.$store.state.authorityId !== null &&
        this.$route.path == "/companies"
      ) {
        try {
          const response = await api().get("/users/listing");
          this.userName = response.data.data.fullname;
        } catch (error) {
          console.error("Kullanıcı adı alınamadı:", error);
        }
      } else {
        console.log("Gerekli oturum bilgileri eksik.");
      }
    },
  },
};
</script>
