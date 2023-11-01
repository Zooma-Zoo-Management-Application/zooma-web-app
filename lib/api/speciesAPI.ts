import { axiosClient, handleApiError } from "./axiosClient";

export const getSpecies = async () => {
  try {
    const { data } = await axiosClient.get(`/Species`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getSpeciesById = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/Species/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const createSpecies = async (values: any) => {
  try {
    const { data } = await axiosClient.post(`/Species`, {
      "name": values.name,
      "description": values.description,
      "imageUrl": values.imageUrl,
      "typeId": values.typeId,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateSpecies = async (id: number, values: any) => {
  try {
    const { data } = await axiosClient.put(`/Species/${id}`, {
      "name": values.name,
      "description": values.description,
      "imageUrl": values.imageUrl,
      "typeId": values.typeId,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const deleteSpecies = async (id: number) => {
  try {
    const { data } = await axiosClient.delete(`/Species/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getSpeciesByAreaId = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/Species/get-species-in-area//${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}