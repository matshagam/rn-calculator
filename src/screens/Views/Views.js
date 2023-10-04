import React, { useContext } from "react";
import { StatusBarStyle } from "../StatusBar/StatusBarStyle";
import { Settings } from "../Settings/Settings";
import { HistoryView } from "../History/History";
import { Output } from "../Output/Output";
import { NumberButtons } from "../Numbers/Numbers";
import { View } from "react-native";
import { ThemeContext } from "../../store/ThemeProvider";

export const Views = () => {
  const { styles, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
      <StatusBarStyle />
      <Settings />
      <HistoryView />
      <Output />
      <NumberButtons />
    </View>
  );
};
