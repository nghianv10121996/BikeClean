import { ImageStyle, ViewStyle } from "react-native";
import { colors } from "../../../../utils/theme/colors";

export const container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
  marginVertical: 4,
  paddingHorizontal: 8
}

export const cardContainer: ViewStyle = {
  flexDirection: "row",
  padding: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.blue,
  backgroundColor: colors.white,
  marginVertical: 6,
  justifyContent: "space-between",
  alignItems: "center"
}

export const image: ImageStyle = {
  width: 90,
  height: 90
}

export const textContainer: ViewStyle = {
  width: "55%"
}

export const textBox: ViewStyle = {
  flexDirection: "row"
}

export const btnGroup: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: -8,
  flexWrap: "wrap"
}

export const btnItem: ViewStyle = {
  width: "50%",
  padding: 8
}