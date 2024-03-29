import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { Image, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { WrapperComponent } from "../../../HOC/WrapperComponent/WrapperComponent";
import ButtonCustom from "../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../elements/button-custom/buttonCustom.props";
import TextField from "../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../elements/text-field/textField.props";
import ToastMarker from "../../../elements/toast-marker/ToastMaker";
import { EToastMarker } from "../../../elements/toast-marker/ToastMaker.props";
import { navigate } from "../../../helper/navigation";
import { get } from "../../../utils/LocalStorage/LocalStorage";
import { UserContext } from "../../../utils/Provider/UserProvider";
import { deleteUser, getUser } from "../../../utils/api/user";
import { CONSTANTS } from "../../../utils/constants/constants";
import { colors } from "../../../utils/theme/colors";
import { IProfile } from "./profile.props";
import * as styles from "./profile.styles";

const ProfileView = (props: IProfile) => {
  const {
    image,
    numberOfBike,
    phoneNumber,
    rewardPoints,
    userName,
    userID
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const emptyText = (text: string) => {
    return text || "(chưa cập nhật)"
  };

  const onDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const { data } = await deleteUser(userID);
      ToastMarker({
        type: EToastMarker.success,
        text: data?.message
      });
      navigate("login");
    } catch (error) {
      ToastMarker({
        type: EToastMarker.error,
        text: error?.message
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <View style={styles.imageContainer}>
        {
          !!image ? (
            <View style={styles.backgroundImage}>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>
          ) : (
            <Icon
              color={colors.white}
              size={135}
              name={"person-circle"}
            />
          )
        }
      </View>
      <View style={styles.userContainer}>
        <TextField
          style={styles.titleStyle}
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={"Họ và tên: "}
        />
        <TextField
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={emptyText(userName)}
        />
      </View>
      <View style={styles.userContainer}>
        <TextField
          style={styles.titleStyle}
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={"SĐT: "}
        />
        <TextField
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={phoneNumber}
        />
      </View>
      <View style={styles.userContainer}>
        <TextField
          style={styles.titleStyle}
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={"Biển số xe: "}
        />
        <TextField
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={emptyText(numberOfBike)}
        />
      </View>
      <View style={styles.userContainer}>
        <TextField
          style={styles.titleStyle}
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={"Điểm Thưởng: "}
        />
        <TextField
          type={ETextType.BLUE}
          typo={ETextField.small}
          text={rewardPoints}
        />
      </View>

      <View style={styles.btnGroup}>
          <View style={styles.btnItem}>
            <ButtonCustom
              type={EButton.submit}
              onPress={() => {
                navigate("account", { user: props} )
              }}
              text="Sửa"
            />
          </View>
          {
            props?.roles === "admin" && (
              <View style={styles.btnItem}>
                <ButtonCustom
                  isLoading={isLoading}
                  type={EButton.delete}
                  onPress={onDeleteAccount}
                  text="Xóa"
                />
              </View>
            )
          }
        </View>
    </>
  )
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState({} as any);
  const { setUser } = useContext(UserContext)

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true);
        try {
          const user: any = await get(CONSTANTS.STORAGE.KEY.USER);
          const dataUser = JSON.parse(user);
          const { data } = await getUser(dataUser?.phoneNumber);
          setDataUser(data);
          setUser(data?.user);
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
    })()
  }, []))

  return WrapperComponent(ProfileView)({ isLoading, ...dataUser.user })
}

export default Profile;