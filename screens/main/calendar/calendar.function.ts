import moment, { Moment } from "moment";

export const getStartOrEndFromDate = (date: Moment, isAll: boolean = true) => {
  return {
    start: moment(date).hour(0).minute(0).toISOString(),
    end: moment(date).hour(24).minute(0).toISOString(),
    isAll: isAll
  }
}

export const getStartOrEndOfMonthFromDate = (date: Moment, isAll: boolean = true) => {
  return {
    start: moment(date).startOf("month").toISOString(),
    end: moment(date).endOf("month").toISOString(),
    isAll: isAll
  }
}

export const convertDateTimeToObject = (data: Moment) => {
  return {
    date: moment(data).toISOString(),
    time: moment(data).toISOString()
  }
}