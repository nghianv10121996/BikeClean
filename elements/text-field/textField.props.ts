import { TextStyle, ViewStyle } from 'react-native';
export enum ETextField {
  small = "small",
  smaller = "smaller",
  medium = "medium",
  large = "large",
}

export enum ETextType {
  WHITE = "white",
  BLACK = "black",
  YELLOW = "yellow",
BLUE = "blue",
  ERROR = "error"
}

export interface ITextField {
  type: ETextType;
  typo: ETextField;
  numberOfLines?: number;
  onPress?: () => void;
  style?: TextStyle[] | TextStyle;
  text: string | undefined | null,
  containerStyle?: ViewStyle | ViewStyle[],
  isHavePassword?: boolean;
}