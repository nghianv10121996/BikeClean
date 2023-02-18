import { ViewStyle } from 'react-native';
import { ETextField } from './../text-field/textField.props';

export enum EButton {
  submit = "submit",
  delete = "delete",
  cancel = "cancel"
}

export interface IButtonCustom {
  type: EButton;
  onPress: () => void;
  text: string;
  containerStyle?: ViewStyle | ViewStyle[],
  style?: ViewStyle | ViewStyle[]
}