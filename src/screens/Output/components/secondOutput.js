import React, { useContext } from "react";
import { Text, View } from "react-native";

import { StateContext } from "../../../store/StateProvider";

export const SecondOutput = () => {
  const { secondSymbolOutput, secondNumberOutput, styles, themeColor, theme } =
    useContext(StateContext);
  console.log("❗", { secondNumberOutput });
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
