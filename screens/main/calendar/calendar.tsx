import moment, { Moment } from 'moment';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Calendar, CalendarTouchableOpacityProps } from 'react-native-big-calendar';
import { WrapperComponent } from '../../../HOC/WrapperComponent/WrapperComponent';
import ButtonCustom from '../../../elements/button-custom/buttonCustom';
import { EButton } from '../../../elements/button-custom/buttonCustom.props';
import { DateTimePickerField } from '../../../elements/date-time-picker-field/DateTimePickerField';
import { ModalCustom } from '../../../elements/modal-custom/modalCustom';
import { Radio } from '../../../elements/radio/Radio';
import TextField from '../../../elements/text-field/textField';
import { ETextField, ETextType } from '../../../elements/text-field/textField.props';
import ToastMarker from '../../../elements/toast-marker/ToastMaker';
import { EToastMarker } from '../../../elements/toast-marker/ToastMaker.props';
import { UserContext } from '../../../utils/Provider/UserProvider';
import { createBooking, getAllBooking } from '../../../utils/api/booking';
import { colors } from '../../../utils/theme/colors';
import { getStartOrEndFromDate } from './calendar.function';
import { EStatus } from './calendar.props';
import { getDatTime, handlePlusDateTime, onValid } from './calendar.rules';
import * as styles from "./calendar.styles";

const CalendarView = (props: any) => {
  const {
    isLoadingChild,
    handleCreated,
    date,
    bookings,
    isModalCreate,
    startField,
    endField,
    options,
    setStartField,
    setEndField,
    errors,
    onChangeRadio,
    setIsModalCreate
  } = props;

  return (
    <SafeAreaView style={styles.container}>
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
            <DateTimePickerField
              data={startField}
              onChangeDate={(data) => {
                setStartField(data);
                const endField = {
                  date: moment(data?.date).add(30, "minute").toDate(),
                  time: moment(data?.time).add(30, "minute").toDate()
                }
                setEndField(endField);
              }}
              isError={errors?.field === "start" && !!errors?.msg}
            />
          </View>
        </View>
        {
          errors?.field === "start" && !!errors?.msg && (
            <TextField
              containerStyle={styles.errorContainer}
              style={styles.errorStyle}
              type={ETextType.ERROR}
              typo={ETextField.smaller}
              text={errors?.msg}
              numberOfLines={2}
            />
          )
        }
        <View style={styles.fieldContainer}>
          <TextField
            containerStyle={styles.textBox}
            type={ETextType.BLUE}
            typo={ETextField.small}
            text={"kết thúc: "}
          />
          <View style={styles.dateTime}>
            <DateTimePickerField
              data={endField}
              onChangeDate={(data) => {
                setEndField(data)
              }}
              isDisabled={true}
              isError={errors?.field === "end" && !!errors?.msg}
            />
          </View>
        </View>
        {
          errors?.field === "end" && !!errors?.msg && (
            <TextField
              containerStyle={styles.errorContainer}
              style={styles.errorStyle}
              type={ETextType.ERROR}
              typo={ETextField.smaller}
              text={errors?.msg}
              numberOfLines={2}
            />
          )
        }
        <View style={styles.optionsContainer}>
          <Radio
            checked={options.clear}
            onChange={(value) => {
              onChangeRadio("clear")
            }}
            label='Rửa xe'
          />
          <Radio
            checked={options.other}
            onChange={(value) => {
              onChangeRadio("other")
            }}
            label='Rửa xe, thay nhớt'
          />
        </View>
        <View style={styles.priceContainer}>
          <TextField
            containerStyle={styles.textBox}
            type={ETextType.BLUE}
            typo={ETextField.small}
            text={"Giá: "}
          />
          <TextField
            type={ETextType.BLUE}
            typo={ETextField.small}
            text={options?.clear ? "45.000Đ" : "Thỏa thuận"}
          />
        </View>
        <View style={styles.btnGroup}>
          <View style={styles.btn}>
            <ButtonCustom
              isLoading={isLoadingChild}
              type={EButton.submit}
              onPress={handleCreated}
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

      <Calendar
        date={date}
        bodyContainerStyle={styles.calendarContainer}
        mode="day"
        events={bookings}
        height={600}
        renderEvent={(
          event: any,
          touchableOpacityProps: CalendarTouchableOpacityProps,
        ) => {
          return (
            <TouchableOpacity {...touchableOpacityProps}>
              <View style={{
                ...styles.events,
                backgroundColor: event?.color,
              }}>
                <TextField
                  style={styles.textEvent}
                  type={ETextType.WHITE}
                  typo={ETextField.smaller}
                  text={event?.title === "my-booking" ? `Bạn đặt` : "Đã được đặt"}
                />
              </View>
            </TouchableOpacity>
          )
        }}
        onPressCell={(date) => setIsModalCreate(true)}
        eventCellStyle={styles.eventCell}
        headerContainerStyle={styles.headerStyle}
        overlapOffset={100}
        theme={{
          palette: {
            primary: {
              main: colors.blue,
              contrastText: colors.white,
            },
          }
        }}
      />
    </SafeAreaView>
  )
}

const CalendarComponent = () => {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(moment())
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingChild, setIsLoadingChild] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [startField, setStartField] = useState<any>({
    date: handlePlusDateTime(moment()),
    time: handlePlusDateTime(moment())
  });
  const [endField, setEndField] = useState<any>({
    date: moment(handlePlusDateTime(moment())).add(30, "minute").toDate(),
    time: moment(handlePlusDateTime(moment())).add(30, "minute").toDate(),
  });

  const [options, setOptions] = useState({
    clear: true,
    other: false
  });

  const [errors, setErrors] = useState<{
    field: string,
    msg: string
  }>({} as {
    field: string,
    msg: string
  })

  const onGetBooking = async (date: Moment) => {
    try {
      const { data } = await getAllBooking(getStartOrEndFromDate(date));
      const bookings = data?.data?.reduce((acc: any[], b: any) => {
        const isMine = Number(b.userID) === Number(user.userID) ? "my-booking" : "other-booking"
        const options = {
          title: isMine,
          start: moment(b.start).toDate(),
          end: moment(b.end).toDate(),
          color: Number(b.userID) === Number(user.userID) ? colors.green : colors.yellow
        }

        return [...acc, options]
      }, []);
      setBookings(bookings);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await onGetBooking(date);
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    })()
  }, [])


  const onChangeRadio = (fieldName: string) => {
    const newData = Object.keys(options).reduce((allField: any, field) => {
      return {
        ...allField,
        [field]: field === fieldName
      }
    }, {
      clear: false,
      other: false,
    });

    setOptions(newData);
  }

  const onCreate = async () => {
    const { isValid, field, msg } = onValid(startField, endField);
    if (isValid) {
      setErrors({
        field,
        msg
      })
      return;
    }
    setIsLoadingChild(true);
    setErrors({} as {
      field: string,
      msg: string
    });

    const params = {
      title: "Đặt rửa xe",
      start: getDatTime(startField),
      end: getDatTime(endField),
      options: options.clear ? "Rửa xe" : "other",
      price: options.clear ? "45.000Đ" : "Thỏa thuận",
      status: EStatus.created
    }

    try {
      const { message } = await createBooking(params, user?.userID);
      await onGetBooking(date);
      ToastMarker({
        type: EToastMarker.success,
        text: message
      })
    } catch (error: any) {
      ToastMarker({
        type: EToastMarker.error,
        text: error?.message
      })
    } finally {
      setIsLoadingChild(false)
    }

  }

  return WrapperComponent(CalendarView)({
    isLoading,
    isLoadingChild,
    date,
    bookings,
    onChangeRadio,
    options,
    errors,
    isModalCreate,
    startField,
    endField,
    setIsModalCreate: setIsModalCreate,
    setStartField: setStartField,
    setEndField: setEndField,
    handleCreated: onCreate
  })
}

export default CalendarComponent;