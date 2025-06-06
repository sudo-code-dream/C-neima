import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzQzYjI4NDRkM2NkYTQzNTgwMGI4MjI2YTlkNDQ2MiIsIm5iZiI6MTc0NTkwMTU1Mi40ODg5OTk4LCJzdWIiOiI2ODEwNTdmMDJlOGJhMDIyZTQ4MGQzMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._iUiceSDI57B4wy6IdMEhrK6uRgcxL5Ytf1sAWxsH9U`,
  },
});

export default axiosClient;
