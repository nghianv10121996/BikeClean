import { ViewStyle } from "react-native";

export interface ICard {
    data: any,
    containerStyle?: ViewStyle | ViewStyle[],
    onPress?: () => void
}