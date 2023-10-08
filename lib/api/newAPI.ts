import { axiosClient, handleApiError } from "./axiosClient";

export const getNews = async () => {
  try {
    const { data } = await axiosClient.get(`/news`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
