import { TextStyle } from 'react-native';
import { ETextField, ETextType } from "./textField.props";
import { colors } from '../../utils/theme/colors';

const BASE = {
  fontSize: 16,
  fontStyle: "normal",
  fontFamily: "OpenSans-Regular"
} as TextStyle

export const PRESETS: Record<ETextField, any> = {
  [ETextField.small]: {
    ...BASE,
    fontSize: 18,
    fontFamily: "OpenSans-Regular"
  } as TextStyle,
  [ETextField.medium]: {
    ...BASE,
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "OpenSans-Medium"
  } as TextStyle,
  [ETextField.large]: {
    ...BASE,
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "OpenSans-SemiBold",
  } as TextStyle
}

export const COLORS: Record<ETextType, string> = {
  [ETextType.WHITE]: colors.white,
  [ETextType.BLACK]: colors.black,
  [ETextType.YELLOW]: colors.yellow,
  [ETextType.BLUE]: colors.blue,
  [ETextType.ERROR]: colors.red
}