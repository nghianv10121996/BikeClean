import moment, { Moment } from "moment";

export const getStartOrEndFromDate = (date: Moment) => {
  return {
    start: moment(date).hour(0).minute(0).toISOString(),
    end: moment(date).hour(24).minute(0).toISOString()
  }
}