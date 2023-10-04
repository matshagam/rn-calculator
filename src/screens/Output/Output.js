import React, { useContext } from "react";
import { View } from "react-native";

import { FirstOutput } from "./components/firstOutput";
import { SecondOutput } from "./components/secondOutput";

import { ThemeContext } from "../../store/ThemeProvider";

export const Output = () => {
  const { styles } = useContext(ThemeContext);

  return (
    <View style={styles.contOutput}>
      <FirstOutput />
      <SecondOutput />
    </View>
  );
};
