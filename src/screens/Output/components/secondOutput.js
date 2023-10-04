import React, { useContext } from "react";
import { Text, View } from "react-native";

import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export const SecondOutput = () => {
  const { secondSymbolOutput = "", secondNumberOutput = "" } =
    useContext(StateContext);
  const { styles, themeColor, theme } = useContext(ThemeContext);
  console.log("❗", { secondSymbolOutput, secondNumberOutput });
  return (
    <View
      style={[
        styles.placeHolderOutput,
        { backgroundColor: themeColor === "dark" ? "#000" : "#dedede" },
      ]}
    >
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {secondSymbolOutput}
      </Text>
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {secondNumberOutput}
      </Text>
    </View>
  );
};
