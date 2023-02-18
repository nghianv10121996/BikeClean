import React, { useContext } from "react"
import { Image, View } from "react-native";
import ButtonCustom from "../../../elements/button-custom/buttonCustom";
import InputField from "../../../elements/input-field/inputField";
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import * as styles from "./login.styles";
import { navigate } from "../../../helper/navigation";
import { CONSTANTS } from "../../../utils/constants/constants";
import { UserContext } from "../../../utils/Provider/UserProvider";
import { EButton } from "../../../elements/button-custom/buttonCustom.props";

const Login = () => {
  const [user, setUser] = useContext(UserContext);

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
            text={"Tài khoản: "}
          />
          <InputField
            type={ETextType.BLUE}
            placeholder="Vui lòng nhập mật khẩu."
            value={""}
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
            placeholder="Vui lòng nhập mật khẩu"
            value=""
          />
        </View>
        <View style={{ ...styles.inputContainer, ...styles.btn }}>
          <ButtonCustom
            type={EButton.submit}
            onPress={() => setUser("users")}
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