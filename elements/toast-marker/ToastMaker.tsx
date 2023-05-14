import Toast from 'react-native-toast-message';
import { IToastMarker } from './ToastMaker.props';

export const ToastMarker = ({ type, text }: IToastMarker) => {
    Toast.hide();
    return Toast.show({
        type: type,
        text1: text
    });
}

export default ToastMarker;