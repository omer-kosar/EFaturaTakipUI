import { boot } from "quasar/wrappers";
import axios from "axios";
import { handleError, handleValidationError } from "src/util/handle-error";
import { getItemFromStorage } from "src/util/local-storage";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.baseUrl });

api.interceptors.request.use(
  function (config) {
    let user = getItemFromStorage("user");
    if (!user) return config;
    config.headers.Authorization = `Bearer ${user?.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn(error);
    if (error.response.status === 422) {
      handleValidationError(error.response.data);
      return;
    }
    if (error.response.status === 401) {
      window.location.href = "#/accessdenied";
      return;
    }
    handleError(error);
  }
);
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
