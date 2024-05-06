<template>
  <div class="flex w-screen">
    <Sidebar :isShow="$store.state.isSidebar" @close-sidebar="closeSidebar" />
    <Navbar :isShow="$store.state.isSidebar" @toggleMenu="toggleSidebar">
      <template v-slot:routerView>
        <router-view />
      </template>
    </Navbar>
  </div>
</template>

<script>
import Sidebar from "@/partitions/sidebar.vue";
import Navbar from "@/partitions/navbar.vue";

export default {
  components: {
    Sidebar,
    Navbar,
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('toggleSidebar');
    },
    closeSidebar() {
      this.$store.state.isSidebar = false;
    },
    handleResize() {
      if (window.innerWidth >= 1200) {
        this.$store.state.isSidebar = true;
      } else {
        this.$store.state.isSidebar = false;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
