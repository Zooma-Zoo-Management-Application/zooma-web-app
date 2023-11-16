import { axiosClient, handleApiError } from "./axiosClient";

interface IFormData {
  title: string;
  content: string;
  image: string;
  description: string;
  userId: number;
}

export const createNew = async (formData:IFormData) => {
  try {
    const { data } = await axiosClient.post(`/news`, formData);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const editNew = async (id : number, formData:IFormData) => {
  try {
    const { data } = await axiosClient.put(`/news/${id}`, formData);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getNews = async () => {
  try {
    const { data } = await axiosClient.get(`/news`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getNewById = async (id : number) => {
  try {
    const { data } = await axiosClient.get(`/news/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteNewById = async (id : number) => {
  try {
    const { data } = await axiosClient.delete(`/news/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const pinNews = async (id : number) => {
  try {
    const { data } = await axiosClient.put(`/news/${id}/pin-news`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const unpinNews = async (id : number) => {
  try {
    const { data } = await axiosClient.put(`/news/${id}/unpin-news`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getPinNews = async () => {
  try {
    const { data } = await axiosClient.get(`/news/pin-news`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getUnpinNews = async () => {
  try {
    const { data } = await axiosClient.get(`/news/unpin-news`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}
