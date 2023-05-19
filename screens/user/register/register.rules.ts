import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    userName: yup.string()
      .trim()
      .required("Vui lòng nhập tên tài khoản."),
    phoneNumber: yup.string()
      .trim()
      .max(20, "SĐT không thể quá 12 kí tự.")
      .required("Vui lòng nhập số điện thoại."),
    newPassword: yup.string()
      .trim()
      .required("Vui lòng nhập mật khẩu."),
    confirmPassword: yup.string()
      .trim()
      .required('Vui lòng nhập mật khẩu.')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp.'),
  })
  .required();