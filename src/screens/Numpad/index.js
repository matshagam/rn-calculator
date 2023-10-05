import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";

export default () => {
  const { sysLang, buttons, _handleEvent } = useContext(StateContext);
  const { theme, themeColor, styles, _styledButtons } =
    useContext(ThemeContext);

  const colSpan = {
    ru_RU: ["троить", "стить", "лить"],
    en_US: ["", "", ""],
  };

  return (
    <View style={[styles.contButtons, { backgroundColor: theme.primaryColor }]}>
      <View style={styles.containerNumbers}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.contRow}>
            {row.map((col, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                onPress={() => _handleEvent(col)}
                style={[
                  styles.contButton,
                  {
                    borderColor: themeColor === "light" ? "#ecf0f1" : null,
                  },
                  themeColor === "light"
                    ? _styledButtons(rowIndex, colIndex)
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.txtDefault,
                    {
                      color: theme.primaryColorTxt,
                    },
                  ]}
                >
                  {col}
                </Text>
                {rowIndex === 0 && colIndex <= 2 ? (
                  <Text style={{ color: theme.primaryColorTxt }}>
                    {colSpan[sysLang][colIndex]}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
