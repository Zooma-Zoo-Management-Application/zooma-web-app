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
        const { data } = await axiosClient.post(`/dietdetails`, formData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const editDietDetail = async (id: number, formData: IFormData) => {
    try {
        const { data } = await axiosClient.put(`/dietdetails/${id}`, formData);
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

export const getDietDetailById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/dietDetails/${id}`);
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

export const deleteDietDetailById = async (id: number) => {
    try {
        const { data } = await axiosClient.delete(`/dietdetails/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};
