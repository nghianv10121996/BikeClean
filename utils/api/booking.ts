import Api from "../Api"

export const createBooking = (params: any, userID: string) => {
  return Api.post(`booking/${userID}`, params, true)
}

export const getAllBooking = (params: any) => {
  return Api.get("bookings", params, true)
}