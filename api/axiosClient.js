import axios from "axios";
import queryString from "query-string";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.backendUrl;

const axiosClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
