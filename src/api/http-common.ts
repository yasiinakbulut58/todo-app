import axios, { AxiosError, AxiosResponse } from "axios";

export const jsonServer = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

jsonServer.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.message) {
      // console.log(error.message);
    }
    return error;
  },
);
