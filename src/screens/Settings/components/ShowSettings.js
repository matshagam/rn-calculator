import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StateContext } from "../../../store/StateProvider";

export const ShowSettings = () => {
  const { _showSettings, theme } = useContext(StateContext);

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => {
        _showSettings();
      }}
    >
      <Ionicons size={20} name="ios-settings" color={theme.secondaryColorTxt} />
    </TouchableOpacity>
  );
};
