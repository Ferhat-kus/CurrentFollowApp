<template>
  <modal
    :name="name"
    :height="modalHeightForMobile"
    :width="modalWidthForMobile"
    :scrollable="true"
    :adaptive="true"
    class="modal"
  >
    <div class="rounded-sm flex flex-col w-full items-center justify-center">
      <header
        class="bg-darkBlue py-3 px-4 rounded-t-sm flex w-full items-center justify-center"
      >
        <div class="w-full flex  items-center justify-between">
          <div class="text-titleTextColor text-base font-semibold">
            {{ headerTitle }}
          </div>
          <div @click="hide">
            <img src="@/assets/icons/close.svg" alt="" />
          </div>
        </div>
      </header>
      <slot name="form"></slot>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: String,
    headerTitle: String,
  },
  data() {
    return {
      modalWidth: "35%",
      modalHeight: "auto",
    };
  },
  methods: {
    show() {
      this.$modal.show(this.name);
    },
    hide() {
      this.$modal.hide(this.name);
    },
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
    modalWidthForMobile() {
      return this.isMobile ? "100%" : this.modalWidth; // Set desired width for mobile
    },
    modalHeightForMobile() {
      return this.isMobile ? "100%" : this.modalHeight;
    },
  },
  watch: {
    isMobile(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.modalWidth = newVal ? this.modalWidthForMobile : "35%"; // Update width on device change
      }
    },
  },
};
</script>
