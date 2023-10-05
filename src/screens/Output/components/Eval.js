import React, { useContext, useEffect, useState } from "react";
import { Text, Animated } from "react-native";
import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export default () => {
  const { evalNumber } = useContext(StateContext);
  const { styles, themeColor, theme } = useContext(ThemeContext);
  const [translateAnim] = useState(new Animated.Value(140));

  useEffect(() => {
    if (evalNumber) {
      Animated.spring(translateAnim, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateAnim, {
        toValue: 140,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [evalNumber]);

  return (
    <Animated.View
      style={[
        styles.placeHolderOutput,
        {
          backgroundColor: themeColor === "dark" ? "#000" : "#dedede",
          transform: [{ translateY: translateAnim }, { perspective: 1000 }],
        },
      ]}
    >
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        =
      </Text>
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {evalNumber}
      </Text>
    </Animated.View>
  );
};
