import { TextStyle, ViewStyle } from 'react-native';
export enum ETextField {
  small = "small",
  medium = "medium",
  large = "large"
}

export enum ETextType {
  WHITE = "white",
  BLACK = "black",
  YELLOW = "yellow",
  BLUE = "blue"
}

export interface ITextField {
  type: ETextType;
  typo: ETextField;
  numberOfLines?: number;
  onPress?: () => void;
  style?: TextStyle[] | TextStyle;
  text: string,
  containerStyle?: ViewStyle | ViewStyle[]
}