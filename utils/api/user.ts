import Api from "../Api";

export const registerUser = (params: any) => {
  return Api.post(`user/register`, params, false)
}

export const getUser = (userID: string) => {
  return Api.get(`user/${userID}`, true)
}

export const updateUser = (params: any) => {
  return Api.put("user", params, true)
}

export const deleteUser = (userID: any) => {
  return Api.delete(`user/${userID}`, true)
}

export const getToken = (params: any) => {
  return Api.post(`user/authenticate`, params, false)
}
