import React, { useContext } from "react";
import StatusBar from "../StatusBar";
import Settings from "../Settings";
import History from "../History";
import Numpad from "../Numpad";
import { View } from "react-native";
import { ThemeContext } from "../../store/ThemeProvider";

export default () => {
  const { styles, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
      <StatusBar />
      <Settings />
      <History />
      <Numpad />
    </View>
  );
};
