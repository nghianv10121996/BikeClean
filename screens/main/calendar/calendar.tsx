import { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonCustom from '../../../elements/button-custom/buttonCustom';
import { EButton } from '../../../elements/button-custom/buttonCustom.props';
import { DateTimePickerField } from '../../../elements/date-time-picker-field/DateTimePickerField';
import { ModalCustom } from '../../../elements/modal-custom/modalCustom';
import TextField from '../../../elements/text-field/textField';
import { ETextField, ETextType } from '../../../elements/text-field/textField.props';
import * as styles from "./calendar.styles";

const events = [
  {
    title: 'Meeting',
    start: new Date(),
    end: new Date(),
  }
]

const CalendarComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const ModalCreate = () => {
    return (
      <ModalCustom
        isVisible={isModalCreate}
        onClose={() => {
          console.log("close")
        }}
      >
        <TextField
            type={ETextType.BLUE}
            typo={ETextField.medium}
            text={"Đặt lịch"}
          />
        <View style={styles.fieldContainer}>
          <TextField
            containerStyle={styles.textBox}
            type={ETextType.BLUE}
            typo={ETextField.small}
            text={"Bắt đầu: "}
          />
          <View style={styles.dateTime}>
            <DateTimePickerField />
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <TextField
            containerStyle={styles.textBox}
            type={ETextType.BLUE}
            typo={ETextField.small}
            text={"kết thúc: "}
          />
          <View style={styles.dateTime}>
            <DateTimePickerField />
          </View>
        </View>
        <View style={styles.btnGroup}>
          <View style={styles.btn}>
            <ButtonCustom
              isLoading={isLoading}
              type={EButton.submit}
              onPress={() => {

              }}
              text="Đặt lịch"
            />
          </View>
          <View style={styles.btn}>
            <ButtonCustom
              type={EButton.delete}
              onPress={() => {
                setIsModalCreate(false);
              }}
              text="Huỷ"
            />
          </View>
        </View>
      </ModalCustom>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ModalCreate />
      <Calendar
        date={new Date()}
        bodyContainerStyle={styles.calendarContainer}
        mode="week"
        events={events}
        height={600}
        onPressEvent={() => {

        }}
        onPressCell={(date) => {
          setIsModalCreate(true);
          console.log(date)
        }}
        headerContentStyle={{
        }}
        headerContainerStyle={{
          height: 55,
        }}
      />
    </SafeAreaView>
  )
}

export default CalendarComponent;