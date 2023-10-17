import { axiosClient, handleApiError } from "./axiosClient";

export const getSixmonthsRevenues = async () => {
  try {
    const { data } = await axiosClient.get(`/Analysis/sixmonths-revenues`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}