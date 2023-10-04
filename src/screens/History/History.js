import React, { useContext } from "react";
import { View } from "react-native";
import { ShowSettings } from "../Settings/components/ShowSettings";
import { Message } from "./components/Message";
import { ClearHistory } from "./components/ClearHistory";
import { ScrollHistory } from "./components/ScrollHistory";
import { EmptyHistory } from "./components/EmptyHistory";

import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";

export const HistoryView = () => {
  const { history } = useContext(StateContext);
  const { theme, styles } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.contHistory,
        { backgroundColor: theme.primaryColor, height: "100%" },
      ]}
    >
      <View
        style={[
          styles.containerHistory,
          { backgroundColor: theme.primaryColor },
        ]}
      >
        <View
          style={[styles.clearCont, { backgroundColor: theme.primaryColor }]}
        >
          <View style={styles.buttonsLeftSide}>
            <ShowSettings />
          </View>
          <ClearHistory />
        </View>
        {history.length !== 0 ? <ScrollHistory /> : <EmptyHistory />}
      </View>
      <Message />
    </View>
  );
};
