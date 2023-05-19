import { ImageStyle, ViewStyle } from "react-native";
import { colors } from "../utils/theme/colors";

export const container: ViewStyle = {
  flex: 1
}

export const imageContainer: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 2,
  borderColor: colors.white,
  overflow: "hidden"
}

export const image: ImageStyle = {
  width: 100,
  height: 100
}