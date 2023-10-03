import React, { useContext } from "react";
import { View, Text } from "react-native";

import { StateContext } from "../../../store/StateProvider";

export const EmptyHistory = () => {
  const { theme, styles } = useContext(StateContext);

  return (
    <View style={styles.emptyHistoryCont}>
      <Text
        style={[styles.txtEmptyHistory, { color: theme.secondaryColorTxt }]}
      >
        Нет истории вычислений
      </Text>
    </View>
  );
};
