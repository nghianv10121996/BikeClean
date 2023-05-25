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