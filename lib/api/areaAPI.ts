import { axiosClient, handleApiError } from "./axiosClient";

export const getAreas = async () => {
  try {
    const { data } = await axiosClient.get(`/Area/GetAllAreas`);
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