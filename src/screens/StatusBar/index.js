import React, { useContext } from "react";

import { StatusBar } from "react-native";
import { ThemeContext } from "../../store/ThemeProvider";

export default () => {
  const { themeColor } = useContext(ThemeContext);

  return (
    <StatusBar
      barStyle={themeColor === "light" ? "dark-content" : "light-content"}
      translucent
    />
  );
};
