import { ViewStyle } from "react-native";
import { colors } from "../../utils/theme/colors";

export const container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
  padding: 8
}

export const loadingContainer: ViewStyle = {
  ...container,
  justifyContent: "center",
  alignItems: "center",
}