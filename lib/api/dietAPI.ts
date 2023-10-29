import { axiosClient, handleApiError } from "./axiosClient";

export const getDiets = async () => {
  try {
    const { data } = await axiosClient.get(`/Diets`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}