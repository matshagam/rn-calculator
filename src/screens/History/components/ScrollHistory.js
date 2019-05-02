import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const ScrollHistory = () => {
  return (
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
          {history.map((thisHistory, index) => (
            <View key={index} style={styles.historyCont}>
              <View style={styles.expressionCont}>
                <Text
                  style={[
                    styles.txtExpression,
                    { color: theme.primaryColorTxt }
                  ]}
                >
                  {thisHistory[0]}
                </Text>
              </View>
              <View style={styles.resultCont}>
                <Text style={styles.txtResult}>{'= ' + thisHistory[1]}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </StateContext.Consumer>
  );
};
