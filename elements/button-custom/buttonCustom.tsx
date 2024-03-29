import { useMemo } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../../utils/theme/colors";
import { Indicator } from "../indicator/Indicator";
import { EIndicator } from "../indicator/Indicator.props";
import TextField from "../text-field/textField";
import { ETextField, ETextType } from "../text-field/textField.props";
import { EButton, IButtonCustom } from "./buttonCustom.props";
import * as styles from "./buttonCustom.styles";

export const ButtonCustom = ({
  onPress,
  text,
  type,
  style,
  containerStyle,
  isLoading = false,
  isDisabled
}: IButtonCustom) => {

  const container = useMemo(() => {
    let styles;
    switch (type) {
      case EButton.submit:
        styles = {
          backgroundColor: colors.blue,
          borderColor: colors.blue
        } as ViewStyle
        break;
      case EButton.cancel:
        styles = {
          backgroundColor: colors.white,
          borderColor: colors.black
        } as ViewStyle
        break;
      case EButton.delete:
        styles = {
          backgroundColor: colors.red,
          borderColor: colors.red
        } as ViewStyle
        break;
    }
    return styles;
  }, [type]);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...container,
        ...containerStyle,
        opacity: isDisabled ? 0.8 : 1
      }}
      disabled={isDisabled}
      onPress={() => onPress?.()}
    >
      {
        isLoading ? (
          <Indicator
            size={EIndicator.small}
            color={colors.white}
          />
        ) : (
          <TextField
            containerStyle={styles.textContainer}
            style={style}
            type={type === EButton.cancel ? ETextType.BLACK : ETextType.WHITE}
            typo={ETextField.small}
            text={text}
          />
        )
      }
    </TouchableOpacity>
  )
}

export default ButtonCustom;