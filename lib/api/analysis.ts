import { axiosClient, handleApiError } from "./axiosClient";

export const getSixmonthsAbalysis = async () => {
  try {
    const { data } = await axiosClient.get(`/Analysis/sixmonths-analysis`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}