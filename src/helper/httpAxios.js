import axios from "axios";

const httpAxios = axios.create({
  baseURL: process.env.BASE_URL,
});

export default httpAxios;
