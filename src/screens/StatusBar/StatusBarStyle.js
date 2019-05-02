import React from 'react';

import { StatusBar } from 'react-native';
import { StateContext } from '../../store/StateProvider';

export const StatusBarStyle = () => {
  return (
    <StateContext.Consumer>
      {({ themeColor }) => (
        <StatusBar
          barStyle={themeColor === 'light' ? 'dark-content' : 'light-content'}
          translucent
        />
      )}
    </StateContext.Consumer>
  );
};
