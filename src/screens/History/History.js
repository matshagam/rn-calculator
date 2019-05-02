import React from 'react';
import { View, Dimensions } from 'react-native';
export const width = Dimensions.get('window').width;

import { ShowSettings } from '../Settings/components/ShowSettings';
import { NightMode } from '../NightMode/NightMode';
import { Message } from './components/Message';
import { ClearHistory } from './components/ClearHistory';
import { ScrollHistory } from './components/ScrollHistory';
import { EmptyHistory } from './components/EmptyHistory';

import { StateContext } from '../../store/StateProvider';

export const HistoryView = () => {
  return (
    <StateContext.Consumer>
      {({ history, theme, styles }) => (
        <View
          style={[
            styles.contHistory,
            { backgroundColor: theme.primaryColor, height: '100%' }
          ]}
        >
          <View
            style={[
              styles.containerHistory,
              { backgroundColor: theme.primaryColor }
            ]}
          >
            <View
              style={[
                styles.clearCont,
                { backgroundColor: theme.primaryColor }
              ]}
            >
              <View style={styles.buttonsLeftSide}>
                <ShowSettings />
                <NightMode />
              </View>
              <ClearHistory />
            </View>
            {history.length !== 0 ? <ScrollHistory /> : <EmptyHistory />}
          </View>
          <Message />
        </View>
      )}
    </StateContext.Consumer>
  );
};
