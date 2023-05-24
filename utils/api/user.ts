import Api from "../Api";

export const registerUser = (params: any) => {
  return Api.post(`user/register`, params, false)
}

export const getUser = (userID: string) => {
  return Api.get(`user/${userID}`, null, true)
}

export const updateUser = (userID: string, body: any) => {
  return Api.put(`user/${userID}`, body, true)
}

export const deleteUser = (userID: any) => {
  return Api.delete(`user/${userID}`, null, true)
}

export const getToken = (params: any) => {
  return Api.post(`user/authenticate`, params, false)
}
