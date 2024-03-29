import React, { useContext, useRef } from "react";
import { ScrollView, View, Text } from "react-native";

import { StateContext } from "../../../store/StateProvider";
import { ThemeContext } from "../../../store/ThemeProvider";

export const ScrollHistory = () => {
  const { history } = useContext(StateContext);
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
      {Object.keys(history).map((key, i) => (
        <View key={i} style={styles.historyCont}>
          {history[key].map((thisHistory, index) => {
            return index === 0 ? (
              <View key={index} style={styles.expressionCont}>
                <Text
                  style={[
                    styles.txtExpression,
                    { color: theme.primaryColorTxt },
                  ]}
                >
                  {thisHistory}
                </Text>
              </View>
            ) : (
              <View key={index} style={styles.resultCont}>
                <Text style={styles.txtResult}>{"= " + thisHistory}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};
