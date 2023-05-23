import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { formatDate, formatTime } from '../../utils/helper';
import TextField from '../text-field/textField';
import { ETextField, ETextType } from '../text-field/textField.props';
import { IDateTimePicker } from './DateTimePickerField.props';
import * as styles from "./DateTimePickerField.styles";
import { colors } from '../../utils/theme/colors';

export const DateTimePickerField = ({
  data,
  onChangeDate,
  isDisabled,
  isError
}: IDateTimePicker) => {
  const [mode, setMode] = useState("time");
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const disabledStyle = useMemo(() => {
    return isDisabled ? {
      backgroundColor: colors.grey,
      opacity: 0.5
    } : {}
  }, [isDisabled]);

  const errorStyle = useMemo(() => {
    return isError ? {
      borderColor: colors.red,
    } : {}
  }, [isError])

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <View style={styles.fieldDate}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={"Ngày: "}
          />
          <TextField
            onPress={() => {
              if(isDisabled) {
                return;
              }
              setMode("date");
              setIsShowDatePicker(true);
            }}
            style={styles.centerText}
            containerStyle={[styles.input, disabledStyle, errorStyle]}
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={formatDate(data?.date)}
          />
        </View>
        <View style={styles.fieldTime}>
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={"Giờ: "}
          />
          <TextField
            onPress={() => {
              if(isDisabled) {
                return;
              }
              setMode("time");
              setIsShowDatePicker(true);
            }}
            style={styles.centerText}
            containerStyle={[styles.input, disabledStyle, errorStyle]}
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={formatTime(data.time)}
          />
        </View>
      </View>
      {
        isShowDatePicker && (
          <DateTimePicker
            mode={mode}
            display="spinner"
            onChange={(event, date) => {
              setIsShowDatePicker(false);
              if (event?.type === "dismissed") {
                return;
              }
              onChangeDate({
                ...data,
                [mode]: moment(date).toDate()
              });
            }}
            value={data[mode]}
          />
        )
      }
    </View>
  )
}