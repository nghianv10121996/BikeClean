import { TextStyle, ViewStyle } from "react-native";
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
  marginVertical: 10
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

export const optionsContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: 20
}

export const priceContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between"
}

export const errorContainer: TextStyle = {
  width: "100%"
}

export const errorStyle: TextStyle = {
  textAlign: "left",
}

export const events: ViewStyle = {
  flex: 1,
  borderWidth: 0,
  borderColor: colors.black,
  borderRadius: 0,
}

export const textEvent: TextStyle = {
  fontSize: 12,
  marginLeft: 5
}

export const eventCell: ViewStyle = {
  padding: 0,
  margin: 0,
  borderRadius: 0
}

export const headerStyle: ViewStyle = {
  height: 55,
}