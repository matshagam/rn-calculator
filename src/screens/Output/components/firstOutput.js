import React, { useContext } from "react";
import { Text, View } from "react-native";
import { StateContext } from "../../../store/StateProvider";

export const FirstOutput = () => {
  const { firstSymbolOutput, firstNumberOutput, styles, themeColor, theme } =
    useContext(StateContext);
  console.log("❗", { firstNumberOutput });
  return (
    <View
      style={[
        styles.placeHolderOutput,
        { backgroundColor: themeColor === "dark" ? "#000" : "#dedede" },
      ]}
    >
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {firstSymbolOutput}
      </Text>
      <Text style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}>
        {firstNumberOutput}
      </Text>
    </View>
  );
};
