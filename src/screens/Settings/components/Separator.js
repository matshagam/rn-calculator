import React, { useContext } from "react";
import { ThemeContext } from "../../../store/ThemeProvider";
import { View } from "react-native";

export default () => {
  const { styles, theme } = useContext(ThemeContext);

  return (
    <View
      style={[styles.separator, { backgroundColor: theme.secondaryColorTxt }]}
    />
  );
};
