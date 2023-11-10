import { axiosClient, handleApiError } from "./axiosClient";

interface IFormData {
    id: number,
    yearOfExperience: number,
    description: string,
    status: boolean,
    userId: number,
    skillId: number,
}

export const createExperience = async (formData: IFormData) => {
    try {
        const { data } = await axiosClient.post(`/TrainerExps`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const editExperience = async (id: number, formData: IFormData) => {
    try {
        const { data } = await axiosClient.put(`/TrainerExp/${id}`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getExperiencesByTrainerId = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/trainerExps/${id}/get-trainerexp-by-trainerId`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

// export const deleteDietById = async (id: number) => {
//     try {
//         const { data } = await axiosClient.delete(`/Diets/${id}`);
//         return { error: null, data };
//     } catch (error) {
//         return handleApiError(error);
//     }
// };
