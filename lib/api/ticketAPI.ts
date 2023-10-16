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

export const checkoutTicket = async (order: {
  currentUser: any,
  date: Date,
  tickets: {
    id: number,
    name: string,
    price: number,
    quantity: number,
  }[],
  }) => {
    {
      try {
        const { data } = await axiosClient.post(`/Payment/checkout/${order.currentUser.id}`, [
          ...order.tickets.map((ticket) => ({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            quantity: ticket.quantity,
            ticketDate: order.date,
          })),
        ]);
        return { error: null, data };
      } catch (error) {
        return handleApiError(error);
      }
    }
  }
