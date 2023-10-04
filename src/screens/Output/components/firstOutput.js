import React, { useContext, useEffect, useState } from "react";
import { Text, Animated } from "react-native";
import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export const FirstOutput = () => {
  const { firstSymbolOutput = "", firstNumberOutput = "" } =
    useContext(StateContext);
  const { styles, themeColor, theme } = useContext(ThemeContext);
  const [translateAnim] = useState(new Animated.Value(70));
  console.log("❗", { firstSymbolOutput, firstNumberOutput });

  useEffect(() => {
    if (firstSymbolOutput) {
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
  }, [firstSymbolOutput]);

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
        {firstSymbolOutput}
      </Text>
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {firstNumberOutput}
      </Text>
    </Animated.View>
  );
};
