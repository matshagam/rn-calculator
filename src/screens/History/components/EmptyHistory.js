import React, { useContext } from "react";
import { View, Text } from "react-native";

import { ThemeContext } from "../../../store/ThemeProvider";
import { StateContext } from "../../../store/StateProvider";

export const EmptyHistory = () => {
  const { theme, styles } = useContext(ThemeContext);
  const { deviceLanguage } = useContext(StateContext);

  const lang = {
    ru_RU: "Нет истории вычислений",
    en_US: "No history of calculations",
  };

  return (
    <View style={styles.emptyHistoryCont}>
      <Text
        style={[styles.txtEmptyHistory, { color: theme.secondaryColorTxt }]}
      >
        {lang[deviceLanguage]}
      </Text>
    </View>
  );
};
