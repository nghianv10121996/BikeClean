import Api from "../Api";

export const getMember = () => {
  return Api.get("member", true);
}