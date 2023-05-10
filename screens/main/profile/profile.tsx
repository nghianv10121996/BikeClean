import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import * as styles from "./profile.styles";
import { colors } from "../../../utils/theme/colors";

const Profile = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View style={styles.userContainer}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"Họ và tên: "}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"Nguyễn Văn Nghĩa"}
        />
      </View>
      <View style={styles.userContainer}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"SĐT: "}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"0911911627"}
        />
      </View>
      <View style={styles.userContainer}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"BSX: "}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"XXXXXXXX"}
        />
      </View>
      <View style={styles.userContainer}>
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"Điểm Thưởng: "}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text={"99999"}
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile;