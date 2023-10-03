import React, { useContext } from "react";
import { View, Text } from "react-native";

import { StateContext } from "../../../store/StateProvider";

export const Message = () => {
  const { styles, messageVisible, message } = useContext(StateContext);

  return messageVisible ? (
    <View style={styles.containerMessage}>
      <Text style={styles.text}>{message}</Text>
    </View>
  ) : null;
};
