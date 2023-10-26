import { axiosClient, handleApiError } from "./axiosClient";

export const getTypes = async () => {
  try {
    const { data } = await axiosClient.get(`/Types`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getTypeById = async (id : number) => {
  try {
    const { data } = await axiosClient.get(`/Types/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateType = async (id:number, typeInfo:any) => {
  try {
    const { data } = await axiosClient.put(`/Types/${id}`, typeInfo);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}