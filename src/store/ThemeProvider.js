import React, { createContext, useEffect, useState } from "react";
import { styles, theme } from "../initialState";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export default ({ children }) => {
  const colorScheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [state, setState] = useState({
    themeColor: colorScheme,
    theme: theme[colorScheme],
    styles: styles,
    colorScheme,
  });

  const _changeThemeColor = (item, index) => {
    setSelectedTheme(index);

    setState({
      ...state,
      themeColor: item,
      theme: theme[item],
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

  useEffect(() => {
    if (selectedTheme === 0) _changeThemeColor(colorScheme, selectedTheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        selectedTheme,
        _changeThemeColor: _changeThemeColor,
        _styledButtons: _styledButtons,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
