import { ActivityIndicator } from "react-native";
import { IIndicator } from "./Indicator.props";

export const Indicator = (props: IIndicator) => {
    return <ActivityIndicator {...props} />
}