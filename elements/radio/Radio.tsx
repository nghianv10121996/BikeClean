import React from "react";
import { TouchableOpacity, View } from "react-native";
import TextField from "../text-field/textField";
import { ETextField, ETextType } from "../text-field/textField.props";
import { IRadio } from "./Radio.props";
import * as styles from "./Radio.styles";

export const Radio = ({
  checked,
  onChange,
  label
}: IRadio) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          onChange(!checked)
        }}
        style={styles.container}
      >
        {
          checked && (
            <View style={styles.checked}></View>
          )
        }
      </TouchableOpacity>
      {
        label && (
          <TextField
            style={styles.label}
            type={ETextType.BLUE}
            typo={ETextField.smaller}
            text={label}
          />
        )
      }
    </View>
  )
}