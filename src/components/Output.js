import React from "react";
import { View } from "react-native";

import Eval from "./Eval";
import Calc from "./Calc";

export default () => {
  return (
    <View>
      <Eval />
      <Calc />
    </View>
  );
};
