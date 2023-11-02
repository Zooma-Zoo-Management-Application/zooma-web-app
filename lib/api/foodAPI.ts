import { axiosClient, handleApiError } from "./axiosClient";

export const getFoods = async () => {
    try {
        const { data } = await axiosClient.get(`/Foods`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getFoodById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/Foods/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
}

export const createFood = async (values: any) => {
    try {
        const { data } = await axiosClient.post(`/Foods`, {
            "id": values.id,
            "name": values.name,
            "description": values.description,
            "energyValue": values.energyValue,
            "imageUrl": values.imageUrl
        });
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateFood = async (id: number, values: any) => {
    try {
        const { data } = await axiosClient.put(`/Foods/${id}`, {
            "name": values.name,
            "description": values.description,
            "energyValue": values.energyValue,
            "imageUrl": values.imageUrl
        });
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
}

// export const deleteSpecies = async (id: number) => {
//     try {
//         const { data } = await axiosClient.delete(`/Species/${id}`);
//         return { error: null, data };
//     } catch (error) {
//         return handleApiError(error);
//     }
// }