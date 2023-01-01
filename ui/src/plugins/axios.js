import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
import TokenService from "../services/token.service";

Vue.use(VueAxios, axios);

let baseUrl = "/api/v1.0";
if (process.env.NODE_ENV === "development"){
  baseUrl = process.env.VUE_APP_API_BASE_URL;
}

if (process.env.VUE_APP_API_MAP) {
  const apiMaps = JSON.parse(process.env.VUE_APP_API_MAP);
  if (window.location.hostname in apiMaps)
    baseUrl = apiMaps[window.location.hostname] + "/api/v1.0";
  else if ("default" in apiMaps) 
    baseUrl = apiMaps["default"] + "/api/v1.0";
}

Vue.axios.defaults.baseURL = baseUrl;

Vue.axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // if (401 === error.response.status) {
  //   TokenService.destroyToken();
  //   TokenService.destroyClientId();
  //   window.location = '/';
  // } else {
  //   return Promise.reject(error);
  // }
});

