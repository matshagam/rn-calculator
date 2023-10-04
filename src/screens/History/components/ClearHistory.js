import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";

import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export const ClearHistory = () => {
  const { _clearHistory, history, deviceLanguage } = useContext(StateContext);
  const { theme, styles } = useContext(ThemeContext);

  const lang = {
    ru_RU: "ОЧИСТИТЬ ИСТОРИЮ",
    en_US: "CLEAR HISTORY",
  };

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      transparent
      onPress={() => _clearHistory()}
    >
      <Text
        style={[
          styles.buttonEmptyHistoryText,
          { color: theme.secondaryColorTxt },
        ]}
      >
        {history.length !== 0 ? lang[deviceLanguage] : null}
      </Text>
    </TouchableOpacity>
  );
};
