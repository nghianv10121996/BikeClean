import Api from "../Api";

export const registerUser = (params: any) => {
  return Api.post('register', params)
}

export const getUser = (userID: string) => {
  return Api.get(`account/${userID}`)
}

export const updateUser = (params: any) => {
  return Api.put("account", params)
}

export const deleteUser = (userID: any) => {
  return Api.delete(`account/${userID}`)
}
