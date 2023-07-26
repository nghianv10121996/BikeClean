import { TextStyle } from 'react-native';
import { ETextField, ETextType } from "./textField.props";
import { colors } from '../../utils/theme/colors';

const BASE = {
  fontSize: 12,
  fontStyle: "normal",
  fontFamily: "OpenSans-Regular"
} as TextStyle

export const PRESETS: Record<ETextField, any> = {
  [ETextField.small]: {
    ...BASE,
    fontSize: 14,
    fontFamily: "OpenSans-Regular"
  } as TextStyle,
  [ETextField.smaller]: {
    ...BASE,
    fontSize: 16,
    fontFamily: "OpenSans-Regular"
  } as TextStyle,
  [ETextField.medium]: {
    ...BASE,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "OpenSans-Medium"
  } as TextStyle,
  [ETextField.large]: {
    ...BASE,
    fontSize: 22,
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