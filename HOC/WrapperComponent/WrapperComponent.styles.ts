import { ViewStyle } from "react-native";
import { colors } from "../../utils/theme/colors";

export const container: ViewStyle = {
  flex: 1,
  position: "relative",
  backgroundColor: colors.white,
  padding: 8
}

export const loadingContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 3,
}