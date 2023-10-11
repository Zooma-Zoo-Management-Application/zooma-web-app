import { axiosClient, handleApiError } from "./axiosClient";

export const getTickets = async () => {
  try {
    const { data } = await axiosClient.get(`/Tickets`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
