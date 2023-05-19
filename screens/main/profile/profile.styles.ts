import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../../utils/theme/colors';

export const container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white
}

export const userContainer: ViewStyle = {
  flexDirection: 'row',
  marginVertical: 8
}

export const titleStyle: TextStyle = {
  fontWeight: "700"
}

export const imageStyle: ImageStyle = {
  width: 160,
  height: 160,
}

export const imageContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.main,
  paddingVertical: 20,
  marginBottom: 20
}

export const backgroundImage: ViewStyle = {
  width: 160,
  height: 160,
  borderRadius: 80,
  borderWidth: 2,
  borderColor: colors.white,
  overflow: "hidden"
}

export const btnGroup: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: -10,
  marginTop: 40,
  justifyContent: "center"
}

export const btnItem: ViewStyle = {
  width: "50%",
  paddingHorizontal: 10
}