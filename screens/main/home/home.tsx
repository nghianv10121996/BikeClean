import { ScrollView, Text, View } from "react-native";
import Swiper from 'react-native-swiper';
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import * as styles from "./home.styles";
import { colors } from "../../../utils/theme/colors";
// API KEY Youtube: AIzaSyDRiQVIXUvdKElOyukTWcPPBYe9SjJo-ao

const Home = () => {
  return (
    <ScrollView style={{
      backgroundColor: colors.white
    }}>
      <View style={styles.container}>
        <Swiper loop={true}>
          <View style={styles.slider}>
            <Text>Hello Swiper</Text>
          </View>
          <View style={styles.slider}>
            <Text>Beautiful</Text>
          </View>
          <View style={styles.slider}>
            <Text>And simple</Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.introStep}>
        <TextField
          type={ETextType.BLUE}
          typo={ETextField.medium}
          text="Giới Thiệu các quy trình rửa xe."
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="1. Kiểm tra bụi bẩn và vết xước."
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="2. Chà xước, vệ sinh xe trước khi rửa."
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="3. Rửa xe bằng nước."
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="4. Tiến hành vệ sinh xe bao gồm rửa thân xe, vệ sinh lốc máy, chà lốp xe, ..."
          numberOfLines={3}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="5. Sau khi hoàn thành các bước 1,2,3,4, bôi đen lớp xe."
          numberOfLines={3}
        />
        <TextField
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="6. Lau xe và nhận phản hồi từ khách hàng."
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  )
}

export default Home;