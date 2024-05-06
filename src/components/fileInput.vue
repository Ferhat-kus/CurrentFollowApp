<template>
  <div class="w-full flex flex-col items-start mx-2">
    <label
      for="inputField"
      class="block my-2 text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <div
      class="bg-lightGray flex items-center w-full text-sm font-medium rounded-md focus:outline-none"
      @dragover.prevent
      ref="inputContainer"
      @drop="handleDrop"
      @click="openFileInput"
    >
      <input
        ref="fileInput"
        id="inputField"
        class="hidden"
        type="file"
        accept=".jpg, .jpeg"
        @change="handleFileChange"
      />
      <div class="bg-darkGray rounded-l-md py-2 px-4 mr-3">Dosya Seç</div>
      <p>
        {{
          selectedFileName ? selectedFileName : "Sürükle ve bırak ya da tıkla."
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
  data() {
    return {
      selectedFileName: "", // Seçilen dosyanın adını saklamak için bir veri alanı ekledik
    };
  },
  methods: {
    handleFileChange(event) {
      const fileList = event.target.files;
      // Dosya seçildiğinde yapılacak işlemler buraya yazılır
      if (fileList.length > 0) {
        this.selectedFileName = fileList[0].name; // Seçilen dosyanın adını güncelle
      } else {
        this.selectedFileName = ""; // Dosya seçilmediyse, seçilen dosya adını boşalt
      }
    },
    handleDrop(event) {
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      // Sürükle bırak işlemi yapıldığında yapılacak işlemler buraya yazılır
    },
    openFileInput() {
      this.$refs.fileInput.click(); // Dosya seçme alanına tıklanınca dosya seçme işlemi başlatılır
    },
  },
};
</script>
