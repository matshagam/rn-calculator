import React, { useContext } from "react";
import { Text, View } from "react-native";
import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export const FirstOutput = () => {
  const { firstSymbolOutput = "", firstNumberOutput = "" } =
    useContext(StateContext);
  const { styles, themeColor, theme } = useContext(ThemeContext);
  console.log("❗", { firstSymbolOutput, firstNumberOutput });
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
