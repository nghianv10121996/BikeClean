import React from 'react';
import { SafeAreaView } from "react-native";
import { Indicator } from '../../elements/indicator/Indicator';
import { EIndicator } from '../../elements/indicator/Indicator.props';
import { colors } from '../../utils/theme/colors';
import * as styles from "./WrapperComponent.styles";

export const WrapperComponent = (WrapperComponent: any) => (props: any) => {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Indicator color={colors.blue} size={EIndicator.large} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <WrapperComponent {...props} />
    </SafeAreaView>
  )
}