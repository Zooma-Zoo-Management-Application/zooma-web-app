import { axiosClient, handleApiError } from "./axiosClient";

export const getAreas = async () => {
  try {
    const { data } = await axiosClient.get(`/area`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAreasBasedOnSpecies = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/area/species/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAnimalsByAreaId = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/animals/area/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getCagesByAreaId = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/cage/area/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAreaById = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/area/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateArea = async (id:number, values:any) => {
  try {
    const { data } = await axiosClient.put(`/Area/${id}`, {
      "name": values?.name || "",
      "description": values?.description || "",
    });
    return { error: null, data: data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const createCage = async (values:any) => {
  try {
    const { data } = await axiosClient.post(`/Cage`, {
      "name": values?.name || "",
      "animalLimit": values?.animalLimit || 0,
      "description": values?.description || "",
      "areaId": values?.areaId || "1",
    });
    return { error: null, data: data };
  } catch (error) {
    return handleApiError(error);
  }
}