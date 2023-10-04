import React, { createContext, useEffect, useState } from "react";
import { styles, theme } from "../initialState";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export default ({ children }) => {
  const colorScheme = useColorScheme();
  const [state, setState] = useState({
    themeColor: colorScheme,
    theme: theme[colorScheme],
    styles: styles,
  });

  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    _storeData(state.themeColor);
  }, [state.themeColor]);

  const _storeData = async (props) => {
    await AsyncStorage.setItem("themeColor", props);
  };

  const _retrieveData = async () => {
    const value = await AsyncStorage.getItem("themeColor");

    if (value) {
      setState({
        ...state,
        themeColor: value,
        theme: value === "light" ? state.theme : theme.dark,
      });
    }
  };

  const _changeThemeColor = () => {
    setState({
      ...state,
      themeColor: state.themeColor === "dark" ? "light" : "dark",
      theme: state.theme === theme.light ? theme.dark : theme.light,
    });
  };

  const _styledButtons = (rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 1 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 2 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 3 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 4 && colIndex === 3) return styles.numeralStyle;

    if (rowIndex === 4 && colIndex === 2) return styles.equallyStyle;

    if (rowIndex === 0 && colIndex === 0) return styles.actionStyle;
    if (rowIndex === 0 && colIndex === 1) return styles.actionStyle;
    if (rowIndex === 0 && colIndex === 2) return styles.actionStyle;
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor: state.themeColor,
        theme: state.theme,
        styles: state.styles,
        _changeThemeColor: _changeThemeColor,
        _styledButtons: _styledButtons,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
