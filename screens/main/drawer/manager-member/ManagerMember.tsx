import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { WrapperComponent } from "../../../../HOC/WrapperComponent/WrapperComponent";
import ButtonCustom from "../../../../elements/button-custom/buttonCustom";
import { EButton } from "../../../../elements/button-custom/buttonCustom.props";
import { Radio } from "../../../../elements/radio/Radio";
import TextField from "../../../../elements/text-field/textField";
import { ETextField, ETextType } from "../../../../elements/text-field/textField.props";
import { getMember } from "../../../../utils/api/member";
import * as styles from "./ManagerMember.styles";
import { navigate } from "../../../../helper/navigation";

const ManagerMemberView = (props: any) => {
  const [checkedValue, setCheckedValue] = useState("")
  return (
    <>
      <ScrollView style={styles.container}>
        {
          props?.members?.map((member: any) => {
            return (
              <View
                key={member.userID}
                style={styles.cardContainer}
              >
                <Image
                  source={{
                    uri: member?.image
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.textContainer}>
                  <View style={styles.textBox}>
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={"Tên: "}
                    />
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={member?.userName}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={"SĐT: "}
                    />
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={member?.phoneNumber}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={"SL/Tháng: "}
                    />
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={"0"}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={"Đánh giá: "}
                    />
                    <TextField
                      type={ETextType.BLACK}
                      typo={ETextField.smaller}
                      text={"good"}
                    />
                  </View>
                </View>
                <View>
                  <Radio
                    checked={checkedValue === member?.userID}
                    value={member?.userID}
                    onChange={() => setCheckedValue(member?.userID)}
                  />
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={styles.btnGroup}>
        <View style={styles.btnItem}>
          <ButtonCustom
            type={EButton.submit}
            onPress={() => {
              if(!checkedValue) {
                return;
              }
              navigate("booking", { memberId: checkedValue})
            }}
            text="Lấy lịch"
          />
        </View>
        <View style={styles.btnItem}>
          <ButtonCustom
            type={EButton.submit}
            onPress={() => {

            }}
            text="Xem"
          />
        </View>
        <View style={styles.btnItem}>
          <ButtonCustom
            type={EButton.submit}
            onPress={() => {

            }}
            text="Xóa nhân viên"
          />
        </View>
      </View>
    </>
  )
}

export const ManagerMember = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await getMember();
        setMembers(data.members)
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return WrapperComponent(ManagerMemberView)({ isLoading, members })
}