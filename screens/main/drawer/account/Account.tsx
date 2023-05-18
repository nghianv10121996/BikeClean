import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ButtonCustom from "../../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../../elements/button-custom/buttonCustom.props";
import InputField from "../../../../elements/input-field/inputField";
import TextField from "../../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../../elements/text-field/textField.props";
import ToastMarker from '../../../../elements/toast-marker/ToastMaker';
import { EToastMarker } from '../../../../elements/toast-marker/ToastMaker.props';
import { navigate } from "../../../../helper/navigation";
import { updateUser } from "../../../../utils/api/user";
import { colors } from "../../../../utils/theme/colors";
import { schema } from './Account.rules';
import * as styles from "./Account.styles";

const Account = (props: any) => {
  const { userName, userID, phoneNumber, numberOfBike, image } = props.route.params.user;
  const [isLoading, setIsLoading] = useState(false);
  const [userImage, setUserImage] = useState<string | undefined | null>(image);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: userName,
      phoneNumber: phoneNumber,
      newPassword: '',
      confirmPassword: '',
      numberOfBike: numberOfBike,
      image: ''
    }
  });

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    const body = {
      userName: formData.userName,
      phoneNumber: phoneNumber,
      numberOfBike: formData.numberOfBike,
      password: formData.newPassword,
      image: userImage
    }

    try {
      await updateUser(userID, body);
      navigate("profile");
      ToastMarker({
        type: EToastMarker.success,
        text: "success"
      });
    } catch (error: any) {
      console.log(error)
      ToastMarker({
        type: EToastMarker.success,
        text: "failed"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSelectImage = async () => {
    const requestPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!requestPermission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setUserImage('data:image/jpeg;base64,' + result?.assets[0].base64)
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 2,
          borderColor: colors.blue,
          overflow: "hidden",
          marginVertical: 12
        }}>
          {
            !!userImage && (
              <Image
                source={{
                  uri: userImage,
                }}
                style={{
                  width: 120,
                  height: 120
                }}
                resizeMode="cover"
              />
            )
          }

        </View>
        <TextField
          onPress={onSelectImage}
          type={ETextType.BLACK}
          typo={ETextField.small}
          text="Chọn ảnh mới"
        />
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <TextField
              type={ETextType.BLUE}
              typo={ETextField.small}
              style={styles.input}
              text={"Tài khoản: "}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type={ETextType.BLUE}
                  placeholder="Nhập tài khoản "
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="userName"
            />
            {errors.userName && (
              <TextField
                containerStyle={styles.errorContainer}
                style={styles.errorStyle}
                type={ETextType.ERROR}
                typo={ETextField.small}
                text={errors.userName?.message}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextField
              type={ETextType.BLUE}
              typo={ETextField.small}
              style={styles.input}
              text={"SĐT: "}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type={ETextType.BLUE}
                  placeholder="Nhập SĐT "
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isDisabled={true}
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && (
              <TextField
                containerStyle={styles.errorContainer}
                style={styles.errorStyle}
                type={ETextType.ERROR}
                typo={ETextField.small}
                text={errors.phoneNumber?.message}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextField
              type={ETextType.BLUE}
              typo={ETextField.small}
              style={styles.input}
              text={"Biển số xe: "}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type={ETextType.BLUE}
                  placeholder="Nhập biển số xe "
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="numberOfBike"
            />
            {errors.numberOfBike && (
              <TextField
                containerStyle={styles.errorContainer}
                style={styles.errorStyle}
                type={ETextType.ERROR}
                typo={ETextField.small}
                text={errors.numberOfBike?.message}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextField
              type={ETextType.BLUE}
              typo={ETextField.small}
              style={styles.input}
              text={"Mật khẩu mới: "}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type={ETextType.BLUE}
                  placeholder="Nhập mật khẩu mới"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPasswordField={true}
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && (
              <TextField
                containerStyle={styles.errorContainer}
                style={styles.errorStyle}
                type={ETextType.ERROR}
                typo={ETextField.small}
                text={errors.newPassword?.message}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextField
              type={ETextType.BLUE}
              typo={ETextField.small}
              style={styles.input}
              text={"Xác nhận mật khẩu:"}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type={ETextType.BLUE}
                  placeholder="Vui lòng nhập mật khẩu"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPasswordField={true}
                />
              )}
              name="confirmPassword"
            />
            {
              errors.confirmPassword && (
                <TextField
                  containerStyle={styles.errorContainer}
                  style={styles.errorStyle}
                  type={ETextType.ERROR}
                  typo={ETextField.small}
                  text={errors.confirmPassword?.message}
                />
              )
            }
          </View>
          <View style={{ ...styles.inputContainer, ...styles.btn }}>
            <View style={styles.btnItem}>
              <ButtonCustom
                isLoading={isLoading}
                type={EButton.submit}
                onPress={handleSubmit(onSubmit)}
                text="Cập Nhật"
              />
            </View>
            <View style={styles.btnItem}>
              <ButtonCustom
                // containerStyle={reStyles.cancelBtn}
                type={EButton.delete}
                onPress={() => {
                  navigate("profile")
                }}
                text="Huỷ"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Account;