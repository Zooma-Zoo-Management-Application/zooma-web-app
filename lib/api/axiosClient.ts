import { BASE_URL } from "@/constants/appInfos";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const handleApiError = async (error:any) => {
  try {
    const errorMessage =
      error.response?.data || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};