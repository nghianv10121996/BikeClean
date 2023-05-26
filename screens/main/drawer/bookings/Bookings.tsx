import moment, { Moment } from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WrapperComponent } from "../../../../HOC/WrapperComponent/WrapperComponent";
import ButtonCustom from "../../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../../elements/button-custom/buttonCustom.props";
import { ModalCustom } from "../../../../elements/modal-custom/modalCustom";
import { Radio } from "../../../../elements/radio/Radio";
import TextField from "../../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../../elements/text-field/textField.props";
import ToastMarker from "../../../../elements/toast-marker/ToastMaker";
import { EToastMarker } from "../../../../elements/toast-marker/ToastMaker.props";
import { changeStatusBooking, getBookingOfMember } from "../../../../utils/api/booking";
import { formatDate, formatTime } from "../../../../utils/helper";
import { colors } from "../../../../utils/theme/colors";
import { EStatus } from "../../calendar/calendar.props";
import * as styles from "../booking/Booking.styles";
import { ELabelStatus } from "./Bookings.props";
import * as stylesOfBookings from "./Bookings.styles";

export const BookingsView = (props: any) => {
  const {
    bookings,
    onChangeStatus,
    status,
    setStatus,
    isShowModal,
    setIsShowModal,
    dataButtonPressed,
    setDataButtonPressed,
    comments,
    setComments,
    labelStatus,
    setLabelStatus
  } = props;

  const confirmText = useMemo(() => {
    return dataButtonPressed?.status === EStatus.created
      ? "Bạn có chắc đổi trạng này?"
      : "Vui lòng nhập nhận xét vể chất lượng đổi ngũ nhân viên, cùng với đánh giá."
  }, [dataButtonPressed?.status]);

  return (
    <ScrollView>
      <View style={stylesOfBookings.statusContainer}>
        <TextField
          style={{
            textAlign: "center"
          }}
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={"Trạng Thái: "}
        />
        <Radio
          checked={status === EStatus.processing}
          value={EStatus.processing}
          label="Đang làm"
          onChange={() => {
            if (status === EStatus.processing) {
              return;
            }
            setStatus(EStatus.processing)
          }}
        />
        <Radio
          checked={status === EStatus.completed}
          value={EStatus.completed}
          label="Hoàn thành"
          onChange={() => {
            if (status === EStatus.completed) {
              return;
            }
            setStatus(EStatus.completed)
          }}
        />
      </View>
      <ModalCustom isVisible={isShowModal} onClose={() => { }}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={confirmText}
          numberOfLines={5}
        />
        {
          dataButtonPressed?.status === EStatus.completed && (
            <>
              <TextField
                containerStyle={stylesOfBookings.labelTitle}
                type={ETextType.BLACK}
                typo={ETextField.small}
                text={"Đánh giá: "}
                numberOfLines={5}
              />
              <View style={stylesOfBookings.labelStatusContainer}>
                <TextField
                  onPress={() => setLabelStatus(ELabelStatus.good)}
                  containerStyle={[
                    stylesOfBookings.labelStatus,
                    labelStatus === ELabelStatus.good
                      ? stylesOfBookings?.labelStatusActive : {}
                  ]}
                  style={{
                    textAlign: "center"
                  }}
                  type={
                    labelStatus === ELabelStatus.good
                      ? ETextType.WHITE : ETextType.BLACK
                  }
                  typo={ETextField.smaller}
                  text={"Tốt"}
                />
                <TextField
                  onPress={() => setLabelStatus(ELabelStatus.normal)}
                  containerStyle={[
                    stylesOfBookings.labelStatus,
                    labelStatus === ELabelStatus.normal
                      ? stylesOfBookings?.labelStatusActive : {}
                  ]}
                  style={{
                    textAlign: "center"
                  }}
                  type={
                    labelStatus === ELabelStatus.normal
                      ? ETextType.WHITE : ETextType.BLACK
                  }
                  typo={ETextField.smaller}
                  text={"Bình Thường"}
                />
                <TextField
                  onPress={() => setLabelStatus(ELabelStatus.bad)}
                  containerStyle={[
                    stylesOfBookings.labelStatus,
                    labelStatus === ELabelStatus.bad
                      ? stylesOfBookings?.labelStatusActive : {}
                  ]}
                  style={{
                    textAlign: "center"
                  }}
                  type={
                    labelStatus === ELabelStatus.bad
                      ? ETextType.WHITE : ETextType.BLACK
                  }
                  typo={ETextField.smaller}
                  text={"Tệ"}
                />
                <TextField
                  onPress={() => setLabelStatus(ELabelStatus.veryBad)}
                  containerStyle={[
                    stylesOfBookings.labelStatus,
                    labelStatus === ELabelStatus.veryBad
                      ? stylesOfBookings?.labelStatusActive : {}
                  ]}
                  style={{
                    textAlign: "center"
                  }}
                  type={
                    labelStatus === ELabelStatus.veryBad
                      ? ETextType.WHITE : ETextType.BLACK
                  }
                  typo={ETextField.smaller}
                  text={"Rất tệ"}
                />
              </View>
            </>
          )
        }
        {
          dataButtonPressed?.status === EStatus.completed && (
            <TextInput
              style={stylesOfBookings.comments}
              multiline={true}
              numberOfLines={5}
              onChangeText={(text) => setComments(text)}
              value={comments}
            />
          )
        }
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

          const isDisabled = b.status === EStatus.cancel

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
                    isDisabled={isDisabled || b.status === EStatus.created}
                    type={EButton.submit}
                    onPress={() => {
                      setIsShowModal(true);
                      setDataButtonPressed({
                        status: EStatus.created,
                        bookingID: b?.bookingID
                      });
                    }}
                    text="Không nhận"
                  />
                </View>
                <View style={styles.btnItem}>
                  <ButtonCustom
                    isDisabled={isDisabled || b.status === EStatus.completed}
                    type={EButton.submit}
                    onPress={() => {
                      if (b.status === EStatus.processing) {
                        setIsShowModal(true);
                        setDataButtonPressed({
                          status: EStatus.completed,
                          bookingID: b?.bookingID
                        })
                      } else {
                        ToastMarker({
                          type: EToastMarker.error,
                          text: `Vui lòng chuyển trạng thái "Đang làm" trước.`
                        })
                      }
                    }}
                    text="Hoàn thành"
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

export const Bookings = (props: any) => {
  const { route: { params: { memberId } } } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(moment());
  const [isShowModal, setIsShowModal] = useState(false);
  const [status, setStatus] = useState(EStatus.processing);
  const [dataButtonPressed, setDataButtonPressed] = useState({
    status: EStatus.created,
    bookingID: "",
  });
  const [comments, setComments] = useState("");
  const [labelStatus, setLabelStatus] = useState(ELabelStatus?.normal);

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
      employeeID: memberId,
      status: status
    }

    setIsLoading(true);
    try {
      const { data } = await getBookingOfMember(params);
      setBookings(data?.data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

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
      case EStatus.created:
        params = {
          status: EStatus.created,
          employeeID: "",
          comments: "",
          labelComments: ""
        }
        await putChangeStatusBooking(params, bookingID);
        break;
      case EStatus.completed:
        params = {
          status: EStatus.completed,
          employeeID: memberId,
          comments: comments,
          labelComments: labelStatus
        }
        await putChangeStatusBooking(params, bookingID);
        break;
    }
  }

  useEffect(() => {
    (async () => {
      await onGetBooking(date);
    })()
  }, [date, status]);

  return WrapperComponent(BookingsView)({
    isLoading,
    bookings: bookings,
    onChangeStatus: onChangeStatus,
    isShowModal,
    setIsShowModal,
    status,
    setStatus: setStatus,
    dataButtonPressed,
    setDataButtonPressed: setDataButtonPressed,
    comments,
    setComments: setComments,
    labelStatus,
    setLabelStatus: setLabelStatus
  })
}