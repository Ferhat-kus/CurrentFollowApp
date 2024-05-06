<template>
  <aside
    class="fixed md:relative h-screen md:bg-lightBlue bg-lightBlue overflow-hidden transition-width ease-in-out duration-300 z-40"
    :class="{
      'md:w-80 w-full': isShow,
      'md:w-16 w-0': !isShow,
      hidden: $route.path === '/' || $route.path === '/signin',
    }"
  >
    <!-- Sidebar header -->
    <div
      class="h-[50px] bg-darkBlue flex items-center justify-between text-white px-2 overflow-hidden"
    >
      <div class="flex w-full items-center">
        <div class="w-1/3 flex items-center justify-center" v-if="isShow">
          <img src="@/assets/bluelogo.png" class="w-8 bg-darkBlue" />
        </div>
        <div class="w-3/3 p-1 flex items-center justify-center" v-if="!isShow">
          <img src="@/assets/bluelogo.png" class="bg-darkBlue" />
        </div>
        <div class="w-2/3 font-bold overflow-hidden truncate" v-if="isShow">
          Sirius Tedarik
        </div>
      </div>
      <div
        class="md:hidden block cursor-pointer p-2"
        v-if="isShow"
        @click="closeSidebar"
      >
        <i class="bx text-white text-3xl bx-x"></i>
      </div>
    </div>

    <!-- Sidebar content -->
    <div
      class="flex flex-col h-5/6 justify-between text-md text-white py-2 overflow-hidden"
    >
      <!-- Sidebar links -->
      <div>
        <router-link
          v-for="(route, index) in routes"
          :key="index"
          :to="route.path"  
        >
          <div
            v-if="isShow"
            :class="{ 'bg-white text-lightBlue': $route.path === route.path }"
            class="flex w-full items-center hover:bg-white hover:text-lightBlue px-2 py-2 my-2 cursor-pointer"
          >
            <div class="md:w-1/3 w-1/6  flex items-center justify-center">
              <i :class="route.icon"></i>
            </div>
            <div class="md:w-2/3 w-2/6 font-semibold">{{ route.label }}</div>
          </div>
          <div
            v-if="!isShow"
            :class="{ 'bg-white text-lightBlue': $route.path === route.path }"
            class="flex w-full items-center hover:bg-white hover:text-lightBlue px-2 py-2 my-2 cursor-pointer"
          >
            <div class="w-full flex items-center justify-center">
              <i :class="route.icon"></i>
            </div>
          </div>
        </router-link>
      </div>
      <!-- exit -->
      <div>
        <router-link to="/signin">
          <div
            v-if="isShow"
            class="flex w-full items-center bg-white text-lightBlue px-2 py-2 my-2 cursor-pointer"
          >
          <div class="md:w-1/3 w-1/6  flex items-center justify-center">
              <i class="bx bx-log-out text-2xl"></i>
            </div>
            <div class="md:w-2/3 w-2/6 font-semibold">Çıkış Yap</div>
          </div>
          <div
            v-else
            class="flex w-full items-center bg-white text-lightBlue py-2 my-2 cursor-pointer"
          >
            <div class="w-full flex items-center justify-center">
              <i class="bx bx-log-out text-2xl"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
  },
  data() {
    return {
      routes: [
        {
          path: "/companies",
          label: "Firmalar",
          icon: "bx bx-buildings text-2xl",
        },
        {
          path: "/bills",
          label: "Faturalar",
          icon: "bx bx-receipt text-2xl",
        },
        {
          path: "/contracts",
          label: "Sözleşmeler",
          icon: "bx bx-edit-alt text-2xl",
        },
        {
          path: "/users",
          label: "Kullanıcılar",
          icon: "bx bx-group text-2xl",
        },
        {
          path: "/settings",
          label: "Ayarlar",
          icon: "bx bx-cog text-2xl",
        },
      ],
    };
  },
  methods: {
    closeSidebar() {
      this.$emit("close-sidebar");
    },
  },
};
</script>

<style>
.main-width {
  width: calc(100vw - 300px);
}
</style>
