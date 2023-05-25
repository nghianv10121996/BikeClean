import { useMemo } from "react"
import { View } from "react-native"
import TextField from "../../elements/text-field/textField"
import { ETextField, ETextType } from "../../elements/text-field/textField.props"
import { EStatus } from "../../screens/main/calendar/calendar.props"
import { formatDate, formatTime } from "../../utils/helper"
import { colors } from "../../utils/theme/colors"
import { ICard } from "./Card.props"
import * as styles from "./Card.styles"

export const Card = ({
  data,
  containerStyle
}: ICard) => {

  const status = useMemo(() => {
    let textContainerStyle = {};
    let textStyle = {};
    let statusTxt = "";
    switch (data.status) {
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

    return {
      textContainerStyle,
      textStyle,
      statusTxt
    }
  }, [data?.status])

  return (
    <View style={{...styles.cardContainer, ...containerStyle}}>
      <TextField
        containerStyle={{ ...status?.textContainerStyle, ...styles.status }}
        style={status?.textStyle}
        type={ETextType.BLACK}
        typo={ETextField.smaller}
        text={status?.statusTxt}
      />
      <View style={styles.card}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.smaller}
          text={data?.bookingID}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.smaller}
          text={data?.options}
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
            text={`Ngày: ${formatDate(data?.start)}`}
          />
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={`Giờ: ${formatTime(data?.start)}`}
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
            text={`Ngày: ${formatDate(data?.end)}`}
          />
          <TextField
            type={ETextType.BLACK}
            typo={ETextField.smaller}
            text={`Giờ: ${formatTime(data?.end)}`}
          />
        </View>
      </View>
    </View>
  )
}