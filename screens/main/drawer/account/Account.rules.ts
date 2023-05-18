import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    userName: yup.string()
      .trim()
      .required("Vui lòng nhập tài khoản"),
    phoneNumber: yup.string()
      .trim()
      .required("Vui lòng nhập số điện thoại"),
    newPassword: yup.string()
      .trim()
      .required("Vui lòng nhập mật khẩu mới"),
    confirmPassword: yup.string()
      .trim()
      .required('Vui lòng nhập mật khẩu.')
      .oneOf([yup.ref('newPassword'), ""], 'Mật khẩu không khớp'),
    numberOfBike: yup.string()
      .trim()
      .notRequired(),
    image: yup.string()
      .trim()
      .notRequired()
  })
  .required();