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

export const updateOrderQuantity = async (id: number, values: any) => {
  try {
    const { data } = await axiosClient.put(`/Orders/${id}/update-used-tickets`, values);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const returnVNPay = async (params: any) => {
  try {
    const { data } = await axiosClient.get(`/Payment/vnpay-return?`+params);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const repayOrder = async (id: number) => {
  try {
    const { data } = await axiosClient.post(`/Payment/repay/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
} 