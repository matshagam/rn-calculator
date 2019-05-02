import React from 'react';
import { View, Text } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const EmptyHistory = () => {
  return (
    <StateContext.Consumer>
      {({ theme, styles }) => (
        <View style={styles.emptyHistoryCont}>
          <Text
            style={[styles.txtEmptyHistory, { color: theme.secondaryColorTxt }]}
          >
            Нет истории вычислений
          </Text>
        </View>
      )}
    </StateContext.Consumer>
  );
};
