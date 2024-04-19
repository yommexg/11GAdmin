import axios, { AxiosInstance } from "axios";

let accessToken: string | null = null;

const createAxiosPrivate = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: true, // if needed
  });

  // // Request interceptor
  // instance.interceptors.request.use(
  //   (config: AxiosRequestConfig) => {
  //     // Modify config as needed, for example, add authorization header
  //     if (
  //       accessToken &&
  //       (!config.headers["Authorization"] || config.method === "get")
  //     ) {
  //       config.headers["Authorization"] = `Bearer ${accessToken}`;
  //     } else if (config.method === "post") {
  //       // Add common headers for POST requests
  //       config.headers["Content-Type"] = "application/json";
  //       // Add other headers if needed
  //     }
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        console.log("okay");
        const response = await instance.get("/refresh");
        console.log(response);
        if (response.status === 200) {
          accessToken = response.data?.accessToken;
          localStorage.setItem("accessToken", response.data?.accessToken);
          error.config.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios.request(error.config);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosPrivate = createAxiosPrivate();
