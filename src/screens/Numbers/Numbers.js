import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";

export const NumberButtons = () => {
  const { buttons, _handleEvent } = useContext(StateContext);
  const { theme, themeColor, styles, _styledButtons } =
    useContext(ThemeContext);

  return (
    <View style={[styles.contButtons, { backgroundColor: theme.primaryColor }]}>
      <View style={styles.containerNumbers}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.contRow}>
            {row.map((col, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                onPress={() => _handleEvent(col)}
              >
                <View
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
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
