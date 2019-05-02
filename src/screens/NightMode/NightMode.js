import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StateContext } from '../../store/StateProvider';

export const NightMode = () => {
  return (
    <StateContext.Consumer>
      {({ _changeThemeColor, theme, themeColor }) => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            _changeThemeColor();
          }}
        >
          <Ionicons
            size={20}
            name={themeColor === 'light' ? 'ios-moon' : 'ios-sunny'}
            color={theme.secondaryColorTxt}
          />
        </TouchableOpacity>
      )}
    </StateContext.Consumer>
  );
};
