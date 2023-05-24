import React from 'react';
import { SafeAreaView, View } from "react-native";
import { Indicator } from '../../elements/indicator/Indicator';
import { EIndicator } from '../../elements/indicator/Indicator.props';
import { colors } from '../../utils/theme/colors';
import * as styles from "./WrapperComponent.styles";

export const WrapperComponent = (WrapperComponent: any) => (props: any) => {
  const { isLoading } = props;

  return (
    <SafeAreaView
      style={styles.container}
    >
      {
        isLoading && (
          <View style={styles.loadingContainer}>
            <Indicator color={colors.white} size={EIndicator.large} />
          </View>
        )
      }
      <WrapperComponent {...props} />
    </SafeAreaView>
  )
}