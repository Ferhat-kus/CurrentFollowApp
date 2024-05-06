import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import VModal from "vue-js-modal";

Vue.use(VModal, {
  componentName: "modal",
  dynamicDefault: { draggable: true, resizable: true },
  adaptive: true,
});

import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);
import "sweetalert2/dist/sweetalert2.min.css";

import commonMixins from "./plugins/commonMixins.js";
Vue.mixin(commonMixins);
  
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
