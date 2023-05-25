import { View } from "react-native"
import TextField from "../../elements/text-field/textField"
import { ETextField, ETextType } from "../../elements/text-field/textField.props"
import * as styles from "./Empty.styles";

export const Empty = () => {
  return (
    <View style={styles.container}>
      <TextField
        type={ETextType.BLACK}
        typo={ETextField.small}
        text={"Không có Lịch"}
      />
    </View>
  )
}