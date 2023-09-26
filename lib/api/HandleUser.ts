import { BASE_URL } from "@/constants/appInfos"
import axiosClient from "./axiosClient"

class HandleUser {
   getUsers = async (url: string) => {
    return axiosClient.get(BASE_URL + url)
  }

  login = async (url: string, data: any) => {
    return axiosClient.post(BASE_URL + url, data)
  }

  signUp = async (url: string, data: any) => {
    return axiosClient.post(BASE_URL + url, data)
  }

  // putPost = async (url: string, data: Post) => {
  //   return axiosClient.put(BASE_URL + url, data)
  // }
 }

 const handleUsers = new HandleUser()

 export default handleUsers