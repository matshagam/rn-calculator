import React, { useContext } from "react";
import { View, Text } from "react-native";

import { ThemeContext } from "../../../store/ThemeProvider";
import { StateContext } from "../../../store/StateProvider";

export default () => {
  const { theme, styles } = useContext(ThemeContext);
  const { sysLang } = useContext(StateContext);

  const lang = {
    ru_RU: "Нет истории вычислений",
    en_US: "No history of calculations",
  };

  return (
    <View style={styles.emptyHistoryCont}>
      <Text
        style={[styles.txtEmptyHistory, { color: theme.secondaryColorTxt }]}
      >
        {lang[sysLang]}
      </Text>
    </View>
  );
};