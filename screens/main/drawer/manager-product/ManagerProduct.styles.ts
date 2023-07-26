import { ViewStyle } from "react-native";
import { colors } from "../../../../utils/theme/colors";

export const cardContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: colors.black,
  borderRadius: 8,
  padding: 8,
  marginVertical: 6,
}

export const statistic: ViewStyle = {
  flexDirection: "row"
}

export const label: ViewStyle = {
  backgroundColor: colors.main,
  alignItems: "center"
}

export const labelText: ViewStyle = {
  marginTop: 4,
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
}

export const cardItem: ViewStyle = {
  flex: 1,
  paddingHorizontal: 4
}

export const status: ViewStyle = {
  padding: 4,
  marginVertical: 4,
}