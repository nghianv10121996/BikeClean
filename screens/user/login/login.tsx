import React, { useContext, useState } from "react";
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
import * as styles from "./login.styles";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [field, setField] = useState({
    phoneNumber: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleField = (fieldName: string) => (value: string) => {
    setField({
      ...field,
      [fieldName]: value
    })
  }

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const { token, user } = await getToken(field);
      await save("token", token);
      await save("user", JSON.stringify(user));
      const  { data: { message } } = await getUser('0');
      toastMarker({
        type: EToastMarker.success,
        text: message
      });
      setUser("user");
    } catch (error) {
      toastMarker({
        type: EToastMarker.error,
        text: "Đăng nhập không thành công"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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
            text={"Số Điện Thoại: "}
          />
          <InputField
            type={ETextType.BLUE}
            placeholder="Vui lòng nhập SĐT."
            value={field.phoneNumber}
            onChangeText={handleField("phoneNumber")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.small}
            style={styles.input}
            text={"Mật khẩu: "}
          />
          <InputField
            type={ETextType.BLUE}
            placeholder="Vui lòng nhập mật khẩu."
            value={field.password}
            onChangeText={handleField("password")}
          />
        </View>
        <View style={{ ...styles.inputContainer, ...styles.btn }}>
          <ButtonCustom
            isLoading={isLoading}
            type={EButton.submit}
            onPress={onLogin}
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
    </View>
  )
}

export default Login;