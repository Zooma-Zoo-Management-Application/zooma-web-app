import { axiosClient, handleApiError } from "./axiosClient";

export const getAreas = async () => {
  try {
    const { data } = await axiosClient.get(`/Area/`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAreasBasedOnSpecies = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/Area/GetAreaBySpeciesId/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAnimalsByAreaId = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/Animals/${id}/get-animals-by-areaId`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getCagesByAreaId = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/Cage/get-cages-by-areaId/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAreaById = async (id:number) => {
  try {
    const { data } = await axiosClient.get(`/Area/${id}`);
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

export const createCage = async (areaId:number, values:any) => {
  try {
    const { data } = await axiosClient.post(`/Cage/CreateCage`, {
      "name": values?.name || "",
      "animalLimit": values?.animalLimit || 0,
      "animalCount": values?.animalCount || 0,
      "description": values?.description || "",
      "status": true,
      "areaId": areaId
    });
    return { error: null, data: data };
  } catch (error) {
    return handleApiError(error);
  }
}