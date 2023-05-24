import { TextStyle, ViewStyle } from "react-native";
import { colors } from "../../../../utils/theme/colors";

export const cardContainer: ViewStyle = {
  borderRadius: 8,
  borderWidth: 1,
  padding: 8,
  marginVertical: 10
}

export const card: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const borderRight: ViewStyle = {
  paddingRight: 4,
  borderRightWidth: 1,
  borderRightColor: colors.blue
}

export const statusStyle: ViewStyle = {
  padding: 6,
  marginVertical: 4,
}

export const btnGroup: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginHorizontal: -8
}

export const btnItem: ViewStyle = {
  width: "50%",
  padding: 8
}

export const status: ViewStyle = {
  minWidth: 100,
  justifyContent: "center",
  alignItems: "center",
}

export const fieldTitle: ViewStyle = {
  backgroundColor: colors.main,
  justifyContent: "center",
  alignItems: "center",
}