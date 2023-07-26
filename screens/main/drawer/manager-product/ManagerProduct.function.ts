import { EStatus } from "../../calendar/calendar.props";

export const getCountOfStatus = (data: any, status: EStatus) => {
  return data?.filter(
    (i: any) => i?.status === status
  ).length;
}