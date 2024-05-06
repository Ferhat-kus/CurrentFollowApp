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
          <span class="text-md font-semibold text-titleTextColor"
            >Merhaba Volkan</span
          >
        </div>
      </div>
    </div>
    <div class="p-2 h-[calc(100vh-50px)]">
      <slot name="routerView" class="h-full p-1">
      </slot>
    </div>
  </main>
</template>

<script>
export default {
    props:{
        isShow:Boolean,
    },
    methods:{
      toggleMenu(){
        this.$emit('toggleMenu')
      }
    }
};
</script>
