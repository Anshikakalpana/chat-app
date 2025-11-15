// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });
import axios from "axios";

const isProd = import.meta.env.MODE === "production";

export const axiosInstance = axios.create({
  baseURL: isProd
    ? import.meta.env.VITE_API_URL 
    : "http://localhost:3000/api", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🧠 Axios baseURL:", axiosInstance.defaults.baseURL);

