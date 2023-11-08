import { axiosClient, handleApiError } from "./axiosClient";

interface IFormData {
    id: number,
    name: string,
    description: string,
    status: boolean,
}

export const createSkill = async (formData: IFormData) => {
    try {
        const { data } = await axiosClient.post(`/skills`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const editSkill = async (id: number, formData: IFormData) => {
    try {
        const { data } = await axiosClient.put(`/skills/${id}`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getSkills = async () => {
    try {
        const { data } = await axiosClient.get(`/Skills`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getSkillById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/Skills/${id}`);
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
