import { TextStyle } from "react-native";
import { ETextType } from './../text-field/textField.props';

export interface IInputField {
  maxLength?: number;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
  onFofus?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: TextStyle | TextStyle[];
  value: string;
  type: ETextType;
  isPasswordField?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isError?: boolean;
}