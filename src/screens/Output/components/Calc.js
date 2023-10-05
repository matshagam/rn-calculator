import React, { useContext, useEffect, useState } from "react";
import { Animated, Text } from "react-native";

import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export default () => {
  const { calcNumber } = useContext(StateContext);
  const { styles, themeColor, theme } = useContext(ThemeContext);
  const [translateAnim] = useState(new Animated.Value(70));

  useEffect(() => {
    if (calcNumber) {
      Animated.spring(translateAnim, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateAnim, {
        toValue: 70,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [calcNumber]);

  return (
    <Animated.View
      style={[
        styles.placeHolderOutput,
        {
          justifyContent: "flex-end",
          backgroundColor: themeColor === "dark" ? "#000" : "#dedede",
          transform: [{ translateY: translateAnim }, { perspective: 1000 }],
        },
      ]}
    >
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {calcNumber}
      </Text>
    </Animated.View>
  );
};
