import React, { useContext } from "react";
import { View } from "react-native";
import { Message } from "../../components/Message";
import Scroll from "../../components/Scroll";
import Empty from "../../components/Empty";

import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";
import Output from "../../components/Output";

export default () => {
  const { history } = useContext(StateContext);
  const { theme, styles } = useContext(ThemeContext);

  return (
    <View style={[styles.contHistory, { backgroundColor: theme.primaryColor }]}>
      <View
        style={[
          styles.containerHistory,
          { backgroundColor: theme.primaryColor },
        ]}
      >
        {!!history.length ? <Scroll /> : <Empty />}
      </View>
      <Message />
      <Output />
    </View>
  );
};
