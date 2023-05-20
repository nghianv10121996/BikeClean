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
  marginVertical: 6
}

export const image: ImageStyle = {
  width: 90,
  height: 90
}

export const textContainer: ViewStyle = {
  marginLeft: 10
}

export const textBox: ViewStyle = {
  flexDirection: "row"
}