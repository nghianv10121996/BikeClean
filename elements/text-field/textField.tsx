import { Text, TextStyle, View } from "react-native";
import { ITextField } from "./textField.props";
import { useMemo } from "react";
import { COLORS, PRESETS } from "./textField.presets";
import { colors } from "../../utils/theme/colors";

export const TextField = ({
  type,
  typo,
  text,
  onPress,
  numberOfLines = 1,
  style,
  containerStyle
}: ITextField) => {

  const colorText = useMemo(() => {
    return {
      color: COLORS[type] || colors.black
    }
  }, [type, typo, style]);

  const styles = useMemo(() => {
    return {
      ...PRESETS[typo],
      ...colorText,
      ...style
    } as TextStyle
  }, [style, typo])


  return (
    <View style={containerStyle}>
      <Text
        disabled={!onPress}
        onPress={() => onPress?.()}
        numberOfLines={numberOfLines}
        style={styles}
      >
        {text}
      </Text>
    </View>
  )
}

export default TextField;