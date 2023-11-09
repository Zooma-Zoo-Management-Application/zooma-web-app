import { axiosClient, handleApiError } from "./axiosClient";

export const removeCage = async (id:number) => {
  try {
    const { data } = await axiosClient.put(`/cage/removal/${id}`);
    return { error: null, data: data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateCage = async (id:number, values:any) => {
  try {
    const { data } = await axiosClient.put(`/cage/${id}`, {
      "name": values?.name || "",
      "animalLimit": values?.animalLimit || 1,
      "description": values?.description || "",
      "areaId": values?.areaId || "1",
    });
    return { error: null, data: data };
  } catch (error) {
    return handleApiError(error);
  }
}