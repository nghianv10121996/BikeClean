import moment, { Moment } from "moment";

export function convertObjectToParams(obj: any) {
  return Object
    .keys(obj)
    .reduce((arr, key) => (
      arr.concat(`${key}=${encodeURIComponent(obj[key])}`)
    ), [])
    .join('&');
}

export const formatDate = (date: Date | Moment) => {
  return moment(date).format("DD-MM-YYYY")
}

export const formatTime = (date: Date | Moment) => {
  return moment(date).format("HH:mm")
}