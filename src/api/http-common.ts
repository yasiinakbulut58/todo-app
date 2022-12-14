import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const jsonServer = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  baseURL: "https://todo-list-server-ten.vercel.app",
});

jsonServer.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.message) {
      toast.error(`${error.message}`);
    }
    return error;
  },
);
