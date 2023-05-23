import { TextStyle, ViewStyle } from "react-native";
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

export const fieldDate: ViewStyle = {
  width: "60%",
  paddingHorizontal: 5,
}

export const fieldTime: ViewStyle = {
  width: "40%",
  paddingHorizontal: 5,
}

export const centerText: TextStyle = {
  alignSelf: "center"
}