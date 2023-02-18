import { useState } from "react";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonCustom from "../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../elements/button-custom/buttonCustom.props";
import InputField from "../../../elements/input-field/inputField";
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import { navigate } from "../../../helper/navigation";
import { registerUser } from "../../../utils/api/user";
import { CONSTANTS } from "../../../utils/constants/constants";
import { colors } from "../../../utils/theme/colors";
import * as styles from "../login/login.styles";
import * as reStyles from "../register/register.styles";

const Register = () => {
  const [form, setForm] = useState({
    phoneNumber: "",
    password: ""
  })

  const onChangeTextInput = (fieldName: string) => (value: string) => {
    setForm({
      ...form,
      [fieldName]: value
    });
  }

  const onSubmit = async () => {
    try {
      const response = await registerUser(form);
    } catch (error) {
      console.log(error)
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
            text={"Tài khoản/SĐT: "}
          />
          <InputField
            type={ETextType.BLUE}
            value={form.phoneNumber}
            placeholder="Vui lòng nhập tài khoản hoặc số điện thoại"
            onChangeText={onChangeTextInput("phoneNumber")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.small}
            style={styles.input}
            text={"Mật khẩu:"}
          />
          <InputField
            type={ETextType.BLUE}
            value={form.password}
            placeholder="Vui lòng nhập mật khẩu"
            onChangeText={onChangeTextInput("password")}
          />
        </View>
        <View style={{ ...styles.inputContainer, ...styles.btn }}>
        <ButtonCustom
            type={EButton.submit}
            onPress={onSubmit}
            text="Đăng kí"
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