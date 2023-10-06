import React, { useContext, useRef } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export default () => {
  const { history, _handleEvent } = useContext(StateContext);
  const { theme, styles } = useContext(ThemeContext);
  const scrollViewRef = useRef();

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ marginTop: 25 }}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }}
    >
      {history.map((key, i) => (
        <View key={i} style={styles.historyCont}>
          {key.calcNumber && (
            <View style={styles.expressionCont}>
              <Text
                style={[styles.txtExpression, { color: theme.primaryColorTxt }]}
              >
                {key.calcNumber}
              </Text>
            </View>
          )}
          {key.per && (
            <View style={styles.expressionCont}>
              <Text
                style={[styles.txtExpression, { color: theme.primaryColorTxt }]}
              >
                % {key.per}
              </Text>
            </View>
          )}
          {key.sum && (
            <TouchableOpacity
              transparent
              style={styles.resultCont}
              onPress={() => _handleEvent(key.sum)}
            >
              <Text style={styles.txtResult}>= {key.sum}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};
