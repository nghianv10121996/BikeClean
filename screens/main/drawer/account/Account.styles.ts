import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../../../utils/theme/colors';
export const container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  marginBottom: 20
}

export const pictureContainer: ViewStyle = {
  flexDirection: "row"
}

export const textPicture: ViewStyle = {
  marginHorizontal: 4
}

export const imageContainer: ViewStyle = {
  width: 120,
  height: 120,
  borderRadius: 60,
  borderWidth: 2,
  borderColor: colors.blue,
  overflow: "hidden",
  marginVertical: 12,
}

export const image: ImageStyle = {
  width: 120,
  height: 120,
}

export const inputBox: ViewStyle = {
  width: "100%"
}

export const inputContainer: ViewStyle = {
  paddingHorizontal: 16,
}

export const input: ViewStyle = {
  marginTop: 10,
  marginBottom: 10
}

export const btn: ViewStyle = {
  marginTop: 32,
  flexDirection: "row",
  marginHorizontal: -10
}

export const btnItem: ViewStyle = {
  width: "50%",
  paddingHorizontal: 10
}

export const register: TextStyle = {
  marginTop: 10,
  alignSelf: "center"
}

export const backButton: TextStyle = {
  marginTop: 20
}

export const errorContainer: ViewStyle = {
  marginTop: 4
}

export const errorStyle: TextStyle = {
  fontSize: 14
}