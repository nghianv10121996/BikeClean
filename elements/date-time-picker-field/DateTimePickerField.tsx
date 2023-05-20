import { Platform, View } from 'react-native';
import TextField from '../text-field/textField';
import { ETextField, ETextType } from '../text-field/textField.props';
import * as styles from "./DateTimePickerField.styles";
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateTimePickerField = () => {
  const [field, setField] = useState({
    date: new Date(),
    time: new Date()
  })
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <View style={styles.field}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={"Ngày: "}
          />
          <TextField
            containerStyle={styles.input}
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={"--"}
          />
        </View>
        <View style={styles.field}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={"Giờ: "}
          />
          <TextField
            containerStyle={styles.input}
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={"--"}
          />
        </View>
      </View>
      {
        <DateTimePicker
          mode="date"
          display="spinner"
          onChange={() => {
            
          }}
          value={new Date()}
        />
      }
    </View>
  )
}