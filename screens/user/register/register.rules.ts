import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    phoneNumber: yup.string()
      .trim()
      .max(20, "SĐT không thể quá 12 kí tự")
      .required("Vui lòng nhập số điện thoại"),
    password: yup.string()
      .trim()
      .max(20, "Mật khẩu không thể quá 20 kí tự")
      .required("Vui lòng nhập mật khẩu"),
  })
  .required();