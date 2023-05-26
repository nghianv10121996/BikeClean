import { TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../../../utils/theme/colors';
export const statusContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between"
}

export const comments: TextStyle = {
  width: "100%",
  textAlign: "left",
  textAlignVertical: "top",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.black,
  padding: 8,
  fontSize: 18,
  marginVertical: 10
}

export const labelStatus: ViewStyle = {
  backgroundColor: colors.grey,
  borderRadius: 8,
  padding: 4,
  minWidth: 50
}

export const labelTitle: ViewStyle = {
  width: "100%",
  marginTop: 15
}

export const labelStatusActive: ViewStyle = {
  backgroundColor: colors.green,
}

export const labelStatusContainer: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between"
}