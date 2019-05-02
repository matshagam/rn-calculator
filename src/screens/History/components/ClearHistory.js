import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const ClearHistory = () => {
  return (
    <StateContext.Consumer>
      {({ _clearHistory, theme, styles, history }) => (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          transparent
          onPress={() => _clearHistory()}
        >
          <Text
            style={[
              styles.buttonEmptyHistoryText,
              { color: theme.secondaryColorTxt }
            ]}
          >
            {history.length !== 0 ? 'УДАЛИТЬ ИСТОРИЮ' : null}
          </Text>
        </TouchableOpacity>
      )}
    </StateContext.Consumer>
  );
};
