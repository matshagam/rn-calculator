import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StateContext } from '../../store/StateProvider';

export const NumberButtons = () => {
  return (
    <StateContext.Consumer>
      {({
        buttons,
        theme,
        themeColor,
        styles,
        _handleEvent,
        _styledButtons
      }) => (
        <View
          style={[styles.contButtons, { backgroundColor: theme.primaryColor }]}
        >
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
                          borderColor: themeColor === 'light' ? '#ecf0f1' : null
                        },
                        themeColor === 'light'
                          ? _styledButtons(rowIndex, colIndex)
                          : null
                      ]}
                    >
                      <Text
                        style={[
                          styles.txtDefault,
                          {
                            color: theme.primaryColorTxt
                          }
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
      )}
    </StateContext.Consumer>
  );
};
