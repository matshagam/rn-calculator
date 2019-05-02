import React from 'react';
import { View } from 'react-native';

import { NumberButtons } from './src/screens/Numbers/Numbers';
import { HistoryView } from './src/screens/History/History';
import { Settings } from './src/screens/Settings/Settings';
import { Output } from './src/screens/Output/Output';
import { StatusBarStyle } from './src/screens/StatusBar/StatusBarStyle';

import StateProvider, { StateContext } from './src/store/StateProvider';

const App = () => {
  return (
    <StateProvider>
      <StateContext.Consumer>
        {({ styles, theme }) => (
          <View
            style={[
              styles.container,
              {
                backgroundColor: theme.primaryColor
              }
            ]}
          >
            <StatusBarStyle />
            <Settings />
            <HistoryView />
            <Output />
            <NumberButtons />
          </View>
        )}
      </StateContext.Consumer>
    </StateProvider>
  );
};

export default App;
