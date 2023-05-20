import { ViewStyle } from "react-native";
import { colors } from "../../../utils/theme/colors";

export const container: ViewStyle = {
  backgroundColor: colors.white,
  flex: 1
}

export const calendarContainer: ViewStyle = {
  backgroundColor: colors.white
}

export const fieldContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-end",
  marginBottom: 20
}

export const textBox: ViewStyle = {
  width: "30%",
  marginBottom: 10
}

export const dateTime: ViewStyle = {
  width: "70%",
}

export const btnGroup: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: -10
}

export const btn: ViewStyle = {
  width: "50%",
  paddingHorizontal: 10,
}