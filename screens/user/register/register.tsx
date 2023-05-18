import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonCustom from "../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../elements/button-custom/buttonCustom.props";
import InputField from "../../../elements/input-field/inputField";
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import ToastMarker from "../../../elements/toast-marker/ToastMaker";
import { EToastMarker } from "../../../elements/toast-marker/ToastMaker.props";
import { navigate } from "../../../helper/navigation";
import { registerUser } from "../../../utils/api/user";
import { CONSTANTS } from "../../../utils/constants/constants";
import { colors } from "../../../utils/theme/colors";
import * as styles from "../login/login.styles";
import * as reStyles from "../register/register.styles";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      phoneNumber: '',
      password: ''
    }
  });

  const onSubmit = async (form: any) => {
    setIsLoading(true)
    try {
      const { message } = await registerUser(form);
      ToastMarker({
        type: EToastMarker.success,
        text: message
      })
    } catch (error: any) {
      ToastMarker({
        type: EToastMarker.success,
        text: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Icon size={80} name="person-add-outline" color={colors.blue} />
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.small}
            style={styles.input}
            text={"Tên tài khoản: "}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                type={ETextType.BLUE}
                placeholder="Nhập tên tài khoản"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="userName"
          />
          {errors.userName && (
            <TextField
              containerStyle={styles.errorContainer}
              style={styles.errorStyle}
              type={ETextType.ERROR}
              typo={ETextField.small}
              text={"Vui Lòng nhập SĐT cho đúng."}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.small}
            style={styles.input}
            text={"SĐT: "}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                type={ETextType.BLUE}
                placeholder="Nhập SĐT"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <TextField
              containerStyle={styles.errorContainer}
              style={styles.errorStyle}
              type={ETextType.ERROR}
              typo={ETextField.small}
              text={"Vui Lòng nhập SĐT cho đúng."}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.small}
            style={styles.input}
            text={"Mật khẩu:"}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                type={ETextType.BLUE}
                placeholder="Vui lòng nhập mật khẩu."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isPasswordField={true}
              />
            )}
            name="password"
          />
          {
            errors.password && (
              <TextField
                containerStyle={styles.errorContainer}
                style={styles.errorStyle}
                type={ETextType.ERROR}
                typo={ETextField.small}
                text={"Vui Lòng nhập mật khẩu cho đúng."}
              />
            )
          }
        </View>
        <View style={{ ...styles.inputContainer, ...styles.btn }}>
          <ButtonCustom
            type={EButton.submit}
            onPress={handleSubmit(onSubmit)}
            text="Đăng kí"
            isLoading={isLoading}
          />
          <ButtonCustom
            containerStyle={reStyles.cancelBtn}
            type={EButton.cancel}
            onPress={() => navigate(CONSTANTS.SCREENS.USER.LOGIN)}
            text="Huỷ"
          />
        </View>
      </View>
    </View>
  )
}

export default Register;