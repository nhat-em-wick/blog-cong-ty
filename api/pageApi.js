import axiosClient from "./axiosClient";

const pageApi = {
  getPage: (slug) => axiosClient.get(`pages/${slug}`)
}

export default pageApi