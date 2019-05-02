import React from 'react';
import { View } from 'react-native';

import { FirstOutput } from './components/firstOutput';
import { SecondOutput } from './components/secondOutput';

import { StateContext } from '../../store/StateProvider';

export const Output = () => {
  return (
    <StateContext.Consumer>
      {({ styles }) => (
        <View style={styles.contOutput}>
          <FirstOutput />
          <SecondOutput />
        </View>
      )}
    </StateContext.Consumer>
  );
};
