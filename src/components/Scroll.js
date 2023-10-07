import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { StateContext } from "../store/StateProvider";
import { ThemeContext } from "../store/ThemeProvider";

export default () => {
  const { history, evalNumber, calcNumber, _handleEvent } =
    useContext(StateContext);
  const { theme, styles } = useContext(ThemeContext);
  const scrollViewRef = useRef();
  const [marginBottom, setMarginBottom] = useState(0);

  useEffect(() => {
    if (evalNumber) {
      if (marginBottom === styles.output.height) {
        setMarginBottom(marginBottom + styles.output.height);
      }
    } else {
      if (marginBottom > styles.output.height) {
        setMarginBottom(marginBottom - styles.output.height);
      }
    }
  }, [evalNumber]);

  useEffect(() => {
    if (calcNumber) {
      if (marginBottom === 0) {
        setMarginBottom(styles.output.height);
      }
    } else {
      if (marginBottom >= styles.output.height) {
        setMarginBottom(0);
      }
    }
  }, [calcNumber]);

  const onContentChange = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ marginTop: 25, marginBottom }}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={onContentChange}
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
                hitSlop={styles.hitSlop}
                style={[styles.resultCont]}
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
