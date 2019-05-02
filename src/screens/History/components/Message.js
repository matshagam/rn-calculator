import React from 'react';
import { View, Text } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const Message = () => {
  return (
    <StateContext.Consumer>
      {({ styles, messageVisible, message }) =>
        messageVisible ? (
          <View style={styles.containerMessage}>
            <Text style={styles.text}>{message}</Text>
          </View>
        ) : null
      }
    </StateContext.Consumer>
  );
};
