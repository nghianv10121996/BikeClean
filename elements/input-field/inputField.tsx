import { useMemo, useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from "../../utils/theme/colors"
import { COLORS } from "../text-field/textField.presets"
import { IInputField } from "./inputField.props"
import * as styles from "./inputField.styles"

export const InputField = (props: IInputField) => {
  const { isPasswordField, isError } = props;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const color = useMemo(() => COLORS[props.type] || colors.black, [props.type]);

  const onChangeRoles = () => {
    setIsShowPassword(!isShowPassword)
  }

  const iconName = useMemo(() => {
    return isShowPassword ? "eye" : "eye-slash"
  }, [isShowPassword]);

  const disabledStyle = useMemo(() => {
    return props.isDisabled ? colors.grey : colors.white
  }, [props.isDisabled]);

  const errorStyle = useMemo(() => {
    return isError ? {
      borderColor: colors.red
    } : {}
  }, [isError])

  return (
    <View
      style={{
        ...styles.container,
        borderColor: color,
        backgroundColor: disabledStyle,
        ...errorStyle
      }}
    >
      <TextInput
        {...props}
        editable={!props.isDisabled}
        style={{ ...styles.input, color }}
        secureTextEntry={!isShowPassword && props.isPasswordField}
      />
      {
        !!isPasswordField && (
          <TouchableOpacity onPress={onChangeRoles}>
            <Icon name={iconName} size={20} color={colors.blue} />
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default InputField;