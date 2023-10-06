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
      {history.map((item, i) => {
        return (
          <View key={i} style={styles.historyCont}>
            {item.calcNumber && (
              <View style={styles.expressionCont}>
                <Text
                  style={[
                    styles.txtExpression,
                    { color: theme.primaryColorTxt },
                  ]}
                >
                  {item.calcNumber}
                  {item.per ? `% (${item.per})` : ""}
                </Text>
              </View>
            )}
            {item.sum && (
              <TouchableOpacity
                transparent
                style={styles.resultCont}
                onPress={() => _handleEvent(item.sum)}
              >
                <Text style={styles.txtResult}>= {item.sum}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};
