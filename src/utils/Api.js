import axios from "axios";

const token = localStorage.getItem("access_token");

const Api = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default Api;
