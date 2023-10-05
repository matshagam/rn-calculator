import React, { useContext } from "react";
import { View } from "react-native";
import { Message } from "./components/Message";
import Scroll from "./components/Scroll";
import Empty from "./components/Empty";

import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";

export default () => {
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
        {!!history.length ? <Scroll /> : <Empty />}
      </View>
      <Message />
    </View>
  );
};
