import axios from "axios";
import store from "../store";
import router from "@/router";

// export function api() {
//     return axios.create({
//         baseURL: "http://localhost:3000"
//     });
// }

export function api() {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = store.state.userToken;
      const companyToken = store.state.myCompanyToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (companyToken) {
        config.headers.companyauthorization = `Bearer ${companyToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            store.dispatch("clearAuth");
            router.push("/signin");
            console.log("KUllanıcı adı yanlışşşş ");
            break;
          case 404:
            store.dispatch("clearAuth");
            router.push("/signin");
            console.log("KUllanıcı bulunamadı ");
            break;
          case 401:
            store.dispatch("clearAuth");
            router.push("/signin");
            console.log("yetkisiz erişim");
            break;
          case 500:
            console.log("sunucu hatası");
            break;
          default:
            // responseHandlerService.handleError(
            //   new Error(error.response.data.message)
            // );
            break;
        }
      }
      return Promise.reject(error);
    }
  );

  return instance; // Return the axios instance
}
