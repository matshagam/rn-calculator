import React, { useContext } from "react";

import { StatusBar } from "react-native";
import { StateContext } from "../../store/StateProvider";

export const StatusBarStyle = () => {
  const { themeColor } = useContext(StateContext);

  return (
    <StatusBar
      barStyle={themeColor === "light" ? "dark-content" : "light-content"}
      translucent
    />
  );
};
