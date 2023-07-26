import { TextStyle, ViewStyle } from 'react-native';

export const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderWidth: 1,
  paddingVertical: 4,
  paddingHorizontal: 12,
  borderRadius: 8,
}

export const input: TextStyle = {
  fontFamily: "OpenSans-Medium",
  fontSize: 12,
  lineHeight: 24,
  width: "90%",
}