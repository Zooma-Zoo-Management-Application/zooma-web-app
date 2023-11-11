import { axiosClient, handleApiError } from "./axiosClient";

interface IFormData {
    id: number,
    yearOfExperience: number,
    description: string,
    status: number,
    userId: number,
    skillId: number,
}

interface IEditForm {
    yearOfExperience: number,
    description: string,
    status: number
}

export const createExperience = async (formData: IFormData) => {
    try {
        const { data } = await axiosClient.post(`/TrainerExps`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const editExperience = async (id: number, formData: IEditForm) => {
    try {
        const { data } = await axiosClient.put(`/TrainerExps/${id}`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getExperiencesByTrainerId = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/TrainerExps/trainer/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};
export const getExperiencesById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/TrainerExps/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};