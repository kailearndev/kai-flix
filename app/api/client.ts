import axios from "axios";

const client = axios.create({
  baseURL: "https://api.example.com", // đổi theo backend của em
  timeout: 5000,
});

// Option: interceptor để log lỗi
client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default client;
