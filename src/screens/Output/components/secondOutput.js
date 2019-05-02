import React from 'react';
import { Text, View } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const SecondOutput = () => {
  return (
    <StateContext.Consumer>
      {({
        secondSymbolOutput,
        secondNumberOutput,
        styles,
        themeColor,
        theme
      }) => (
        <View
          style={[
            styles.placeHolderOutput,
            { backgroundColor: themeColor === 'dark' ? '#000' : '#dedede' }
          ]}
        >
          <Text
            style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}
          >
            {secondSymbolOutput}
          </Text>
          <Text
            style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}
          >
            {secondNumberOutput}
          </Text>
        </View>
      )}
    </StateContext.Consumer>
  );
};
