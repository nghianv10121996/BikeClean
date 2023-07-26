import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, View } from "react-native";
import ButtonCustom from "../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../elements/button-custom/buttonCustom.props";
import InputField from "../../../elements/input-field/inputField";
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import toastMarker from "../../../elements/toast-marker/ToastMaker";
import { EToastMarker } from "../../../elements/toast-marker/ToastMaker.props";
import { navigate } from "../../../helper/navigation";
import { save } from "../../../utils/LocalStorage/LocalStorage";
import { UserContext } from "../../../utils/Provider/UserProvider";
import { getToken, getUser } from "../../../utils/api/user";
import { CONSTANTS } from "../../../utils/constants/constants";
import { schema } from "./login.rules";
import * as styles from "./login.styles";
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (form: any) => {
    setIsLoading(true);
    try {
      const { token, user } = await getToken(form);
      await save(CONSTANTS.STORAGE.KEY.TOKEN, token);
      await save("user", JSON.stringify(user));
      const { data: { message } } = await getUser(user.phoneNumber);
      toastMarker({
        type: EToastMarker.success,
        text: message
      });
      setUser(user);
    } catch (error: any) {
      toastMarker({
        type: EToastMarker.error,
        text: error?.message
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../../../assets/images/logo.png")}
      />
      <View style={styles.inputBox}>
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
                isError={!!errors.phoneNumber?.message}
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
            text={"Mật khẩu: "}
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
                isError={!!errors.password?.message}
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
            isLoading={isLoading}
            type={EButton.submit}
            onPress={handleSubmit(onSubmit)}
            text="Đăng Nhập"
          />
        </View>
        <TextField
          onPress={() => navigate(CONSTANTS.SCREENS.USER.REGISTER)}
          type={ETextType.WHITE}
          typo={ETextField.small}
          style={styles.register}
          text={"Đăng kí tài khoản."}
        />
      </View>
    </SafeAreaView>
  )
}

export default Login;