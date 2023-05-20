import { ViewStyle } from "react-native";
import { colors } from "../../utils/theme/colors";

export const container: ViewStyle = {
  width: "100%"
}

export const input: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.blue,
  borderRadius: 8,
  justifyContent: "center",
  padding: 8,
  height: 40
}

export const fieldContainer: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: -5
}

export const field: ViewStyle = {
  width: "50%",
  paddingHorizontal: 5,
}