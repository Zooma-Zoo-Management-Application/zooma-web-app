import { axiosClient, handleApiError } from "./axiosClient";


export const loginUser = async (email:string, password:string) => {
  try {
    const { data } = await axiosClient.post(`/users/Login`, {
      email,
      password
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const registerUser = async ({userInfo}:{
  userInfo: {
    username: string,
    email: string,
    gender: string,
    dateOfBirth: string,
    avatarUrl: string,
    newPassword: string,
    confirmNewPassword: string,
  }
}) => {
  try {
    const res = await axiosClient.post(`/users/sign-up`, {
      "userName": userInfo?.username,
      "email": userInfo.email,
      "fullName": "",
      "phoneNumber": "",
      "gender": userInfo.gender,
      "dateOfBirth": userInfo.dateOfBirth,
      "avatarUrl": userInfo.avatarUrl,
      "password": userInfo.newPassword,
      "confirmPassword": userInfo.confirmNewPassword,
  });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkToken = async (token:string) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosClient.get(`/users/Launch`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getUserById = async (id : number) => {
  try {
    const { data } = await axiosClient.get(`/users/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getStaffs = async () => {
  try {
    const { data } = await axiosClient.get(`/users/staffs`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getZooTrainers = async () => {
  try {
    const { data } = await axiosClient.get(`/users/zoo-trainers`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getVisitors = async () => {
  try {
    const { data } = await axiosClient.get(`/users/visitors`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}