import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { WrapperComponent } from "../../../../HOC/WrapperComponent/WrapperComponent";
import TextField from "../../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../../elements/text-field/textField.props";
import { getAllBooking } from "../../../../utils/api/booking";
import { colors } from "../../../../utils/theme/colors";
import { getStartOrEndOfMonthFromDate } from "../../calendar/calendar.function";
import { EStatus } from "../../calendar/calendar.props";
import { getCountOfStatus } from "./ManagerProduct.function";
import * as styles from "./ManagerProduct.styles";

const ManagerProductView = (props: any) => {
  const numberOfCancel = getCountOfStatus(props.bookings, EStatus.cancel);
  const numberOfCompleted = getCountOfStatus(props.bookings, EStatus.completed);
  return (
    <>
      <TextField
        containerStyle={styles.label}
        type={ETextType.WHITE}
        typo={ETextField.smaller}
        text={"Thống kê"}
      />
      <View>
        <View style={styles.statistic}>
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={"Đơn hàng/ tháng: "}
          />
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={props?.bookings?.length}
          />
        </View>
        <View style={styles.statistic}>
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={"Đơn hàng bị hủy/ tháng: "}
          />
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={numberOfCancel}
          />
        </View>
        <View style={styles.statistic}>
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={"Đơn hàng đã xong/ tháng:  "}
          />
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={numberOfCompleted}
          />
        </View>
      </View>
      <FlatList
        data={props.bookings}
        keyExtractor={(b) => b?.bookingID}
        renderItem={({ item }) => {
          let textContainerStyle = {};
          let statusTxt = "";
          switch (item.status) {
            case EStatus.created:
              textContainerStyle = {
                ...styles.status,
                backgroundColor: colors.green,
              }
              statusTxt = "Đang chờ"
              break;
            case EStatus.completed:
              textContainerStyle = {
                ...styles.status,
                backgroundColor: colors.red,
              }
              statusTxt = "Đã hoàn thành"
              break;
            case EStatus.processing:
              textContainerStyle = {
                ...styles.status,
                backgroundColor: colors.yellow,
              }
              statusTxt = "Đang làm"
              break;
            case EStatus.cancel:
              textContainerStyle = {
                ...styles.status,
                backgroundColor: colors.grey,
              }
              statusTxt = "Hủy"
              break;
          }
          return (
            <View style={styles.cardContainer}>
              <View style={styles.cardItem}>
                <TextField
                  containerStyle={styles.label}
                  type={ETextType.WHITE}
                  typo={ETextField.smaller}
                  text={"ID"}
                />
                <TextField
                  containerStyle={styles.labelText}
                  type={ETextType.BLACK}
                  typo={ETextField.smaller}
                  text={item?.bookingID}
                />
              </View>
              <View style={styles.cardItem}>
                <TextField
                  containerStyle={styles.label}
                  type={ETextType.WHITE}
                  typo={ETextField.smaller}
                  text={"Trạng thái"}
                />
                <TextField
                  containerStyle={[styles.labelText, textContainerStyle]}
                  type={ETextType.WHITE}
                  typo={ETextField.smaller}
                  text={statusTxt}
                />
              </View>
              <View style={styles.cardItem}>
                <TextField
                  containerStyle={styles.label}
                  type={ETextType.WHITE}
                  typo={ETextField.smaller}
                  text={"Đánh giá"}
                />
                {
                  !!item?.labelComments ? (
                    <TextField
                      containerStyle={{ ...styles.labelText, backgroundColor: colors.green }}
                      type={ETextType.WHITE}
                      typo={ETextField.smaller}
                      text={item?.labelComments}
                    />
                  ) : <TextField
                    containerStyle={{ ...styles.labelText, backgroundColor: colors.green }}
                    type={ETextType.WHITE}
                    typo={ETextField.smaller}
                    text={"Chưa có"}
                  />
                }
              </View>
            </View>
          )
        }}
      />
    </>
  )
}

export const ManagerProduct = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(moment())

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllBooking(getStartOrEndOfMonthFromDate(date, true));
        const dataBookings = data?.data;
        setBookings(dataBookings);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [date]);

  return WrapperComponent(ManagerProductView)({ isLoading, bookings })
}