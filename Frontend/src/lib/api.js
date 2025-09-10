import axios from "axios";

const api = axios.create({
  baseURL: "https://notezy-backend-sb6g.onrender.com",// 
});

// Add token to every request if exists // Attach token automatically (for future protected calls)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
