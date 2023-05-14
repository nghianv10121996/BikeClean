import { TextStyle, ViewStyle } from 'react-native';

export const container: ViewStyle = {
  position: "relative",
  borderWidth: 1,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "space-between"
}

export const input: TextStyle = {
  fontFamily: "OpenSans-Medium",
  fontSize: 14,
  lineHeight: 24,
  width: "90%",
}