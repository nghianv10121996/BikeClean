import Api from "../Api"

export const createBooking = (params: any, userID: string) => {
  return Api.post(`booking/${userID}`, params, true)
}

export const getAllBooking = (params: any) => {
  return Api.get("bookings", params, true)
}

export const deleteBooking = (params: any) => {
  return Api.delete("booking", params, true)
}

export const changeStatusBooking = (params: any, bookingID: string) => {
  return Api.put(`booking/${bookingID}`, params, true)
}