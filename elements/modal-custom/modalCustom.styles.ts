import { ViewStyle } from 'react-native';
export const container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const content: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, .5)"
}

export const contentBox: ViewStyle = {
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 16,
  width: "80%",
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  minHeight: 80
}