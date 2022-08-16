import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (params) => axiosClient.get('categories'),
  getBySlug: (slug) => axiosClient.get(`categories/${slug}`)
}

export default categoryApi