import moment, { Moment } from "moment";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WrapperComponent } from "../../../../HOC/WrapperComponent/WrapperComponent";
import ButtonCustom from "../../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../../elements/button-custom/buttonCustom.props";
import { ModalCustom } from "../../../../elements/modal-custom/modalCustom";
import TextField from "../../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../../elements/text-field/textField.props";
import { UserContext } from "../../../../utils/Provider/UserProvider";
import { changeStatusBooking, getNewBooking } from "../../../../utils/api/booking";
import { formatDate, formatTime } from "../../../../utils/helper";
import { colors } from "../../../../utils/theme/colors";
import { EStatus } from "../../calendar/calendar.props";
import * as styles from "./Booking.styles";

export const BookingView = (props: any) => {
  const {
    bookings,
    onChangeStatus,
    isShowModal,
    setIsShowModal,
    dataButtonPressed,
    setDataButtonPressed
  } = props;

  return (
    <ScrollView>
      <ModalCustom isVisible={isShowModal} onClose={() => { }}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={`Bạn có chắc muốn "Hủy" đơn hàng này?`}
          numberOfLines={5}
        />
        <View style={styles.btnGroup}>
          <View style={styles.btnItem}>
            <ButtonCustom
              type={EButton.submit}
              onPress={() => onChangeStatus(
                dataButtonPressed?.status, dataButtonPressed?.bookingID
              )}
              text="Oke"
            />
          </View>
          <View style={styles.btnItem}>
            <ButtonCustom
              type={EButton.delete}
              onPress={() => setIsShowModal(false)}
              text="Hủy"
            />
          </View>
        </View>
      </ModalCustom>
      {
        bookings?.map((b: any) => {
          let textContainerStyle = {};
          let textStyle = {};
          let statusTxt = "";
          switch (b.status) {
            case EStatus.created:
              textContainerStyle = {
                ...styles.statusStyle,
                backgroundColor: colors.green,
              }
              textStyle = {
                color: colors.white
              }
              statusTxt = "Đang chờ"
              break;
            case EStatus.completed:
              textContainerStyle = {
                ...styles.statusStyle,
                backgroundColor: colors.red,
              }
              textStyle = {
                color: colors.white
              }
              statusTxt = "Đã hoàn thành"
              break;
            case EStatus.processing:
              textContainerStyle = {
                ...styles.statusStyle,
                backgroundColor: colors.yellow,
              }
              textStyle = {
                color: colors.white
              }
              statusTxt = "Đang làm"
              break;
            case EStatus.cancel:
              textContainerStyle = {
                ...styles.statusStyle,
                backgroundColor: colors.grey,
              }
              textStyle = {
                color: colors.white
              }
              statusTxt = "Hủy"
              break;
          }

          const isDisabled = b.status === EStatus.completed || b.status === EStatus.cancel
          return (
            <View key={b?.bookingID} style={styles.cardContainer}>
              <TextField
                containerStyle={{ ...textContainerStyle, ...styles.status }}
                style={textStyle}
                type={ETextType.BLACK}
                typo={ETextField.smaller}
                text={statusTxt}
              />
              <View style={styles.card}>
                <TextField
                  type={ETextType.BLACK}
                  typo={ETextField.smaller}
                  text={b?.bookingID}
                />
                <TextField
                  type={ETextType.BLACK}
                  typo={ETextField.smaller}
                  text={b?.options}
                />
                <View>
                  <TextField
                    containerStyle={styles.fieldTitle}
                    type={ETextType.WHITE}
                    typo={ETextField.smaller}
                    text={`Bắt đầu`}
                  />
                  <TextField
                    type={ETextType.BLACK}
                    typo={ETextField.smaller}
                    text={`Ngày: ${formatDate(b?.start)}`}
                  />
                  <TextField
                    type={ETextType.BLACK}
                    typo={ETextField.smaller}
                    text={`Giờ: ${formatTime(b?.start)}`}
                  />
                  <TextField
                    containerStyle={styles.fieldTitle}
                    type={ETextType.WHITE}
                    typo={ETextField.smaller}
                    text={`Kết thúc`}
                  />
                  <TextField
                    type={ETextType.BLACK}
                    typo={ETextField.smaller}
                    text={`Ngày: ${formatDate(b?.end)}`}
                  />
                  <TextField
                    type={ETextType.BLACK}
                    typo={ETextField.smaller}
                    text={`Giờ: ${formatTime(b?.end)}`}
                  />
                </View>
              </View>
              <View style={styles.btnGroup}>
                <View style={styles.btnItem}>
                  <ButtonCustom
                    isDisabled={isDisabled || b.status === EStatus.processing}
                    type={EButton.submit}
                    onPress={() => onChangeStatus(EStatus.processing, b?.bookingID)}
                    text="Nhận"
                  />
                </View>
                <View style={styles.btnItem}>
                  <ButtonCustom
                    isDisabled={isDisabled || b.status === EStatus.cancel}
                    type={EButton.submit}
                    onPress={() => {
                      setIsShowModal(true);
                      setDataButtonPressed({
                        status: EStatus.cancel,
                        bookingID: b?.bookingID
                      });
                    }}
                    text="Hủy"
                  />
                </View>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export const Booking = (props: any) => {
  const { route: { params: { memberId } } } = props;
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(moment());
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [dataButtonPressed, setDataButtonPressed] = useState();
  const [status, setStatus] = useState(EStatus.created);

  const onGetBooking = async (date: Moment) => {
    let params = {
      start: moment(date).set({
        hour: 8,
        minute: 0
      }).toISOString(),
      end: moment(date).set({
        hour: 20,
        minute: 0
      }).toISOString(),
      status: EStatus.created
    }

    try {
      const { data } = await getNewBooking(params);
      setBookings(data?.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    (async () => {
      await onGetBooking(date);
    })()
  }, [date]);

  const putChangeStatusBooking = async (params: any, bookingID: string) => {
    setIsLoading(true)
    try {
      await changeStatusBooking(params, bookingID);
      await onGetBooking(date);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  const onChangeStatus = async (status: EStatus, bookingID: string) => {
    setIsShowModal(false);
    let params;
    switch (status) {
      case EStatus.processing:
        params = {
          status: EStatus.processing,
          employeeID: memberId,
          comments: "",
          labelComments: ""
        }
        await putChangeStatusBooking(params, bookingID);
        break;
      case EStatus.cancel:
        params = {
          status: EStatus.cancel,
          employeeID: "",
          comments: "",
          labelComments: ""
        }
        await putChangeStatusBooking(params, bookingID);
        break;
    }
  }

  return WrapperComponent(BookingView)({
    isLoading,
    bookings: bookings,
    onChangeStatus: onChangeStatus,
    isShowModal,
    setIsShowModal: setIsShowModal,
    dataButtonPressed,
    setDataButtonPressed: setDataButtonPressed,
  })
}