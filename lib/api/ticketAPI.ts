import { axiosClient, handleApiError } from "./axiosClient";

type Ticket = {
  name: string;
  description: string;
  price: number;
}

export const getTickets = async () => {
  try {
    const { data } = await axiosClient.get(`/Tickets`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateTicket = async (ticketId: string, ticket: Ticket) => {
  try {
    const { data } = await axiosClient.put(`/Tickets/${ticketId}`, {
      name: ticket?.name || "",
      description: ticket?.description || "",
      price: ticket?.price || 0,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}
