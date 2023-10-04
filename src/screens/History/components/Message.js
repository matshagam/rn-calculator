import React, { useContext } from "react";
import { View, Text } from "react-native";

import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export const Message = () => {
  const { messageVisible, message } = useContext(StateContext);
  const { styles } = useContext(ThemeContext);

  return messageVisible ? (
    <View style={styles.containerMessage}>
      <Text style={styles.text}>{message}</Text>
    </View>
  ) : null;
};
