import React, { useContext } from "react";
import { View } from "react-native";

import Eval from "./components/Eval";
import Calc from "./components/Calc";

import { ThemeContext } from "../../store/ThemeProvider";

export default () => {
  const { styles } = useContext(ThemeContext);

  return (
    <View style={styles.contOutput}>
      <Eval />
      <Calc />
    </View>
  );
};
