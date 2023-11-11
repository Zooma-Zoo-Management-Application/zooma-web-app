import { axiosClient, handleApiError } from "./axiosClient";

interface IFormData {
    id: number,
    name: string,
    description: string,
    createAt: Date,
    updateAt: Date,
    scheduleAt: Date,
    endAt: Date,
    feedingDateArray: string[],
    feedingTime: Date,
    quantity: number,
    status: boolean,
    FoodId: number
}

export const createDietDetail = async (formData: IFormData) => {
    try {
        const { data } = await axiosClient.post(`/DietDetails`, formData);
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

export const getDietDetails = async () => {
    try {
        const { data } = await axiosClient.get(`/DietDetails`);
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
        const { data } = await axiosClient.get(`/dietDetails/diet-details/${dietId}`);
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
