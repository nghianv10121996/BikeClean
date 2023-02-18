import { TextInput, View } from "react-native"
import { IInputField } from "./inputField.props"
import * as styles from "./inputField.styles"
import { useMemo } from "react"
import { COLORS } from "../text-field/textField.presets"
import { colors } from "../../utils/theme/colors"

export const InputField = (props: IInputField) => {
  const color = useMemo(() => COLORS[props.type] || colors.black, [props.type])
  return (
    <View style={{...styles.container, borderColor: color }}>
      <TextInput
        {...props}
        style={{...styles.input, color}}
      />
    </View>
  )
}

export default InputField;