import { axiosClient, handleApiError } from "./axiosClient";

export const getOrders = async () => {
  try {
    const { data } = await axiosClient.get(`/Orders`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getOrdersByUserId = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/Orders/get-orders-by-user/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateOrder = async (id: number, values: any) => {
  try {
    const { data } = await axiosClient.put(`/Orders/update-paymethod/${id}`, { 
      "paymentMethod": values.paymentMethod || "VNPay",
      "notes": values.notes,
      "status": values.status || 0,
     });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}