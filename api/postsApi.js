import axiosClient from "./axiosClient";

const postApi = {
  getPosts: (params) => axiosClient.get('posts', {params}),
  getPost: (slug) => axiosClient.get(`posts/${slug}`)
}

export default postApi