import React, { useContext } from "react";
import { StatusBarStyle } from "../StatusBar/StatusBarStyle";
import { Settings } from "../Settings/Settings";
import { HistoryView } from "../History/History";
import { Output } from "../Output/Output";
import { NumberButtons } from "../Numbers/Numbers";
import { View } from "react-native";
import { StateContext } from "../../store/StateProvider";

export const Views = () => {
  const { styles, theme } = useContext(StateContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primaryColor,
        },
      ]}
    >
      <StatusBarStyle />
      <Settings />
      <HistoryView />
      <Output />
      <NumberButtons />
    </View>
  );
};
