import { ViewStyle } from "react-native";
import { colors } from "../../utils/theme/colors";

export const wrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
}

export const container: ViewStyle = {
  width: 20,
  height: 20,
  borderWidth: 1,
  borderColor: colors.blue,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center"
}

export const checked: ViewStyle = {
  width: 10,
  height: 10,
  backgroundColor: colors.blue,
  borderRadius: 10
}

export const label: ViewStyle = {
  marginLeft: 10
}