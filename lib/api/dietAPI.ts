import { axiosClient, handleApiError } from "./axiosClient";

interface IFormData {
    id: number,
    name: string,
    description: string,
    createAt: Date,
    updateAt: Date,
    scheduleAt: Date,
    goal: string,
    endAt: Date,
    totalEnergyValue: number,
    status: boolean,
}

export const createDiet = async (formData: IFormData) => {
    try {
        const { data } = await axiosClient.post(`/Diets`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const editDiet = async (id: number, formData: IFormData) => {
    try {
        const { data } = await axiosClient.put(`/Diets/${id}`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getDiets = async () => {
    try {
        const { data } = await axiosClient.get(`/Diets`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getDietById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/Diets/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getDietDetailByDietId = async (dietId: number) => {
    try {
        const { data } = await axiosClient.get(`/getDietDetailsByDietId/${dietId}`);
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
