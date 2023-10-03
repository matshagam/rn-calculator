import React, { useContext } from "react";
import { View } from "react-native";

import { FirstOutput } from "./components/firstOutput";
import { SecondOutput } from "./components/secondOutput";

import { StateContext } from "../../store/StateProvider";

export const Output = () => {
  const { styles } = useContext(StateContext);

  return (
    <View style={styles.contOutput}>
      <FirstOutput />
      <SecondOutput />
    </View>
  );
};
