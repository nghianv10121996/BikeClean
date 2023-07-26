import moment, { Moment } from "moment";
interface IData {
  date: Moment,
  time: Moment
}

export const getDatTime = (data: IData) => {
  const hour = moment(data?.time).get("hour");
  const time = moment(data?.time).get("minute");
  const field = moment(data?.date).set({
    hour,
    minute: time
  });
  return field;
}

export const handlePlusDateTime = (data: Moment) => {
  const hour = moment(data).get("hour");
  const time = moment(data).get("minute");
  const field = moment(data).toDate();

  return field;
}

export const onValid = (start: IData, end: IData) => {
  let msg = "";
  let field = ""
  const startField = getDatTime(start);
  const endField = getDatTime(end);
  if (moment(startField).isBefore(moment(), "millisecond")) {
    field = "start";
    msg = "Vui lòng chọn thời gian bắt đầu sau thời gian hiện tại."
  }

  if (moment(startField).isAfter(endField, "millisecond")) {
    field = "start";
    msg = "Vui lòng chọn thời gian bắt đầu phải trước thời gian kết thúc."
  }

  if (!(startField.get("hour") < 20 && startField.get("hour") > 7)) {
    field = "start"
    msg = "Vui lòng chọn trong khoảng thời gian làm việc"
  }

  return {
    isValid: !!field || !!msg,
    msg,
    field
  }
}