import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext } from "../../store/ThemeProvider";

export const NightMode = () => {
  const { theme, themeColor, _changeThemeColor } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{ marginLeft: 20 }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => {
        _changeThemeColor();
      }}
    >
      <Ionicons
        size={20}
        name={themeColor === "light" ? "ios-moon" : "ios-sunny"}
        color={theme.secondaryColorTxt}
      />
    </TouchableOpacity>
  );
};
