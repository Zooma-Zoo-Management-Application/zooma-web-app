import { axiosClient, handleApiError } from "./axiosClient";

export const getAnimals = async () => {
  try {
    const { data } = await axiosClient.get(`/Animals`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
