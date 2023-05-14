import { TextInput, View } from "react-native"
import { IInputField } from "./inputField.props"
import * as styles from "./inputField.styles"
import { useMemo, useState } from "react"
import { COLORS } from "../text-field/textField.presets"
import { colors } from "../../utils/theme/colors"
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native"

export const InputField = (props: IInputField) => {
  const { isPasswordField } = props;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const color = useMemo(() => COLORS[props.type] || colors.black, [props.type]);

  const onChangeRoles = () => {
    setIsShowPassword(!isShowPassword)
  }

  const colorsIcon = useMemo(() => {
    return isShowPassword ? colors.blue : colors.main
  }, [isShowPassword])

  return (
    <View style={{...styles.container, borderColor: color }}>
      <TextInput
        {...props}
        style={{...styles.input, color}}
        secureTextEntry={isShowPassword}
      />
      {
        !!isPasswordField && (
          <TouchableOpacity onPress={onChangeRoles}>
            <Icon name="lock" size={25} color={colorsIcon} />
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default InputField;