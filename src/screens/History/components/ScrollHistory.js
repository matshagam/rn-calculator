import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const ScrollHistory = () => (
  <StateContext.Consumer>
    {({ theme, styles, history }) => (
      <ScrollView
        style={{
          marginTop: 25
        }}
        ref={ref => (this.scrollView = ref)}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true });
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
                      { color: theme.primaryColorTxt }
                    ]}
                  >
                    {thisHistory}
                  </Text>
                </View>
              ) : (
                <View key={index} style={styles.resultCont}>
                  <Text style={styles.txtResult}>{'= ' + thisHistory}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    )}
  </StateContext.Consumer>
);
