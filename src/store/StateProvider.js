import React, { Component } from 'react';
import { Clipboard } from 'react-native';
import { AsyncStorage } from 'react-native';

import {
  buttons,
  initialOutput,
  maxLength,
  theme,
  styles
} from '../initialState';

export const StateContext = React.createContext();

export default class StateProvider extends Component {
  state = {
    firstSymbolOutput: '',
    firstNumberOutput: initialOutput,
    secondSymbolOutput: '',
    secondNumberOutput: initialOutput,
    history: [],
    saveHistory: false,
    messageVisible: false,
    settingsVisible: false,
    message: '',
    themeColor: 'light',
    theme: theme.light,
    styles: styles,
    buttons: buttons
  };

  componentWillMount() {
    this._retrieveData();
    this._retrieveHistory();
    this._retrieveSettings();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.themeColor !== this.state.themeColor) {
      this._storeData(nextState.themeColor);
    }

    if (nextState.saveHistory !== this.state.saveHistory) {
      this._storeSettings(nextState.saveHistory);
    }

    if (
      nextState.history.length !== this.state.history.length &&
      nextState.saveHistory === true
    ) {
      this._storeHistory(nextState.history);
    }
  }

  _storeHistory = async props => {
    await AsyncStorage.setItem('history', JSON.stringify(props));
  };

  _storeData = async props => {
    await AsyncStorage.setItem('themeColor', props);
  };

  _storeSettings = async props => {
    await AsyncStorage.setItem('settings', JSON.stringify(props));
  };

  _retrieveHistory = async () => {
    const value = await AsyncStorage.getItem('history');
    if (value !== null) {
      this.setState({
        history: JSON.parse(value)
      });
    }
  };

  _retrieveSettings = async () => {
    const value = await AsyncStorage.getItem('settings');
    if (value !== null) {
      this.setState(state => ({
        saveHistory: value === 'true' ? true : state.saveHistory
      }));
    }
  };

  _retrieveData = async () => {
    const value = await AsyncStorage.getItem('themeColor');
    if (value !== null) {
      this.setState(state => ({
        themeColor: value,
        theme: value === 'light' ? state.theme : theme.dark
      }));
    }
  };

  _saveData = () => {
    this.setState(state => ({
      saveHistory: !state.saveHistory
    }));
  };

  _handleEvent = value => {
    const {
      firstSymbolOutput,
      secondSymbolOutput,
      secondNumberOutput
    } = this.state;

    if (
      (!isNaN(value) && !secondNumberOutput.includes('%')) ||
      (value === '.' && !secondNumberOutput.includes(value)) ||
      (value === '%' && !secondNumberOutput.includes(value))
    ) {
      this._concatToNumberOutput(value);
    } else {
      switch (value) {
        case buttons[1][3]:
        case buttons[2][3]:
        case buttons[3][3]:
        case buttons[4][3]:
          if (firstSymbolOutput !== '=' || secondSymbolOutput) {
            this._evaluate();
            this._concatToSymbolOutput(value);
          }
          break;

        case buttons[0][0]:
          this._setToClipboard();
          break;

        case buttons[0][1]:
          this._initOutput();
          break;

        case buttons[0][2]:
          if (secondNumberOutput.length === 1) {
            this.setState({
              secondNumberOutput: initialOutput
            });
          } else {
            this._replaceLastIndex('');
          }
          break;

        case buttons[4][2]:
          this._evaluate();
          this.setState({
            firstSymbolOutput: value,
            secondSymbolOutput: ''
          });
          break;
      }
    }
  };

  _concatToNumberOutput = value => {
    const { secondNumberOutput } = this.state;
    if (secondNumberOutput.length >= maxLength) {
      this._showMessage(`Превышен максимум в ${maxLength} цифр!`);
    } else {
      if (secondNumberOutput !== initialOutput) {
        this.setState({
          secondNumberOutput: secondNumberOutput + '' + value + ''
        });
      } else {
        this.setState({ secondNumberOutput: value + '' });
      }
    }
  };

  _concatToSymbolOutput = value => {
    const { secondSymbolOutput } = this.state;
    if (secondSymbolOutput) {
      this.setState({
        secondSymbolOutput: value + '',
        firstSymbolOutput: ''
      });
    } else {
      this.setState({
        secondSymbolOutput: '' + value,
        firstSymbolOutput: ''
      });
    }
  };

  _replaceLastIndex = value => {
    const { secondNumberOutput } = this.state;
    let str1 = secondNumberOutput.replace(/.$/, value);
    this.setState({
      secondNumberOutput: str1
    });
  };

  _evaluate = () => {
    const {
      firstNumberOutput,
      secondNumberOutput,
      secondSymbolOutput,
      history
    } = this.state;

    let aHistory = [...history];
    let includesX = secondSymbolOutput.includes('x') ? true : false;
    let includesPercent = secondNumberOutput.includes('%') ? true : false;
    let dEval;
    let tEval;

    try {
      if (secondNumberOutput !== initialOutput) {
        if (includesPercent) {
          tEval =
            eval(
              firstNumberOutput +
                secondSymbolOutput.replace(/[+]|[-]|[x]/g, '*') +
                secondNumberOutput.slice(0, -1)
            ) / 100;

          if (includesX) {
            aHistory.push([
              firstNumberOutput + secondSymbolOutput + secondNumberOutput,
              tEval
            ]);
          } else {
            dEval = eval(firstNumberOutput + secondSymbolOutput + tEval);
            aHistory.push([
              firstNumberOutput +
                secondSymbolOutput +
                secondNumberOutput +
                ' (' +
                tEval +
                ')',
              dEval
            ]);
          }

          this.setState({
            firstNumberOutput: includesX ? tEval : dEval,
            secondNumberOutput: initialOutput,
            history: aHistory
          });
        } else {
          if (
            firstNumberOutput !== initialOutput &&
            isNaN(secondSymbolOutput)
          ) {
            dEval = eval(
              firstNumberOutput +
                this._convertToMathExpression(secondSymbolOutput) +
                secondNumberOutput
            );

            aHistory.push([
              firstNumberOutput + secondSymbolOutput + secondNumberOutput,
              dEval
            ]);

            this.setState({
              firstNumberOutput: dEval,
              secondNumberOutput: initialOutput,
              history: aHistory
            });
          } else {
            this.setState({
              firstNumberOutput: secondNumberOutput,
              secondNumberOutput: initialOutput
            });
          }
        }
      }
    } catch (exception) {
      this._showMessage(`${exception}`);
    }
  };

  _convertToMathExpression = value => {
    let strTemp = value.replace(
      new RegExp(this._escapeRegExp(buttons[1][3]), 'g'),
      '/'
    );
    strTemp = strTemp.replace(
      new RegExp(this._escapeRegExp(buttons[2][3]), 'g'),
      '*'
    );
    return strTemp;
  };

  _escapeRegExp = str => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  };

  _initOutput = () => {
    this.setState({
      firstSymbolOutput: '',
      firstNumberOutput: initialOutput,
      secondSymbolOutput: '',
      secondNumberOutput: initialOutput
    });
  };

  _clearHistory = () => {
    this.setState({
      history: []
    });
  };

  _setToClipboard = () => {
    const { firstNumberOutput } = this.state;
    const clipboard = firstNumberOutput.toString();
    Clipboard.setString(clipboard);
    this._showMessage(`Сохранено в буфер: ${clipboard}`);
  };

  _showMessage = message => {
    this.setState({ messageVisible: true, message: message }, () => {
      setTimeout(() => {
        this.setState({ messageVisible: false });
      }, 3000);
    });
  };

  _showSettings = () => {
    this.setState({
      settingsVisible: !this.state.settingsVisible
    });
  };

  _changeThemeColor = () => {
    this.setState(state => ({
      themeColor: state.themeColor === 'dark' ? 'light' : 'dark',
      theme: state.theme === theme.light ? theme.dark : theme.light
    }));
  };

  _styledButtons = (rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 1 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 2 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 3 && colIndex === 3) return styles.numeralStyle;
    if (rowIndex === 4 && colIndex === 3) return styles.numeralStyle;

    if (rowIndex === 4 && colIndex === 2) return styles.equallyStyle;

    if (rowIndex === 0 && colIndex === 0) return styles.actionStyle;
    if (rowIndex === 0 && colIndex === 1) return styles.actionStyle;
    if (rowIndex === 0 && colIndex === 2) return styles.actionStyle;
  };

  render() {
    return (
      <StateContext.Provider
        value={{
          firstSymbolOutput: this.state.firstSymbolOutput,
          firstNumberOutput: this.state.firstNumberOutput,
          secondSymbolOutput: this.state.secondSymbolOutput,
          secondNumberOutput: this.state.secondNumberOutput,
          history: this.state.history,
          messageVisible: this.state.messageVisible,
          settingsVisible: this.state.settingsVisible,
          message: this.state.message,
          themeColor: this.state.themeColor,
          theme: this.state.theme,
          styles: this.state.styles,
          buttons: this.state.buttons,
          saveHistory: this.state.saveHistory,
          _showSettings: this._showSettings,
          _saveData: this._saveData,
          _changeThemeColor: this._changeThemeColor,
          _clearHistory: this._clearHistory,
          _showSettings: this._showSettings,
          _handleEvent: this._handleEvent,
          _styledButtons: this._styledButtons
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
