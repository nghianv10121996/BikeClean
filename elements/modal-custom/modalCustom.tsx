import { Modal, Text, View } from "react-native";
import { IModalCustom } from "./modalCustom.props";
import * as styles from "./modalCustom.styles";

export const ModalCustom = ({ isVisible, onClose, children }: IModalCustom) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose?.()}
    >
      <View style={styles.content}>
        <View style={styles.contentBox}>
          {children}
        </View>
      </View>
    </Modal>
  )
}