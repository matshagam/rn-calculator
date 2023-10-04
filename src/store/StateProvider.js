import React, { createContext, useEffect, useState } from "react";
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { buttons, sysLang, initialOutput, maxLength } from "../initialState";
import { isNumeric } from "../utils";

export const StateContext = createContext();

export default ({ children }) => {
  const [state, setState] = useState({
    firstSymbolOutput: "",
    firstNumberOutput: "",
    secondNumberOutput: "",
    history: [],
    isHistorySaved: false,
    isMessageVisible: false,
    isSettingsVisible: false,
    message: "",
    buttons: buttons,
    sysLang: sysLang,
  });

  useEffect(() => {
    _retrieveSettings();
  }, []);

  useEffect(() => {
    _storeSettings(state.isHistorySaved);
  }, [state.isHistorySaved]);

  useEffect(() => {
    if (state.isHistorySaved) {
      _storeHistory(state.history);
    }
  }, [state.history]);

  const _storeHistory = async (props) => {
    await AsyncStorage.setItem("history", JSON.stringify(props));
  };

  const _storeSettings = async (props) => {
    await AsyncStorage.setItem("settings", JSON.stringify(props));
  };

  const _retrieveHistory = async () => {
    const value = await AsyncStorage.getItem("history");

    if (value) {
      setState({
        ...state,
        history: JSON.parse(value),
      });
    }
  };

  const _retrieveSettings = async () => {
    const value = await AsyncStorage.getItem("settings");

    if (value) {
      setState({
        ...state,
        isHistorySaved: value ? value : state.isHistorySaved,
      });

      if (value) _retrieveHistory();
    }
  };

  const _saveData = () => {
    setState({
      ...state,
      isHistorySaved: !state.isHistorySaved,
    });
  };

  const _handleEvent = (value) => {
    const { firstNumberOutput, secondNumberOutput, history } = state;
    let sum, dEval, tEval, toEval, temp;

    const last = secondNumberOutput.slice(-1);

    if (!isNumeric(last) && value === last) return;

    const isPercent = /[%]/.test(last);
    const isExist = /[+]|[-]/.test(secondNumberOutput);
    const isDotNotExist = !/[+].*[.]/.test(secondNumberOutput);

    if (secondNumberOutput.length >= maxLength) {
      _showMessage(`Превышен максимум в ${maxLength} цифр!`);
    }

    switch (value) {
      case buttons[0][0]:
        _setToClipboard();

        break;

      case buttons[0][1]:
        _initOutput();

        break;

      case buttons[0][2]:
        setState({
          ...state,
          secondNumberOutput:
            secondNumberOutput.length === 1
              ? initialOutput
              : secondNumberOutput.slice(0, -1),
        });

        break;

      case buttons[0][3]:
        if (isExist && isNumeric(last)) {
          dEval = eval(secondNumberOutput);
          tEval = dEval / 100;
          sum = dEval + tEval;

          setState({
            ...state,
            firstNumberOutput: sum,
            firstSymbolOutput: buttons[4][2],
            secondNumberOutput: secondNumberOutput + value,
            history,
          });

          history.push([secondNumberOutput + " (" + tEval + ")", sum]);
        }

        break;

      case buttons[1][3]:
      case buttons[2][3]:
      case buttons[3][3]:
      case buttons[4][3]:
        if (isNumeric(last)) {
          toEval = secondNumberOutput.replace(/÷/, "/").replace(/x/, "*");
          dEval = eval(toEval);

          setState({
            ...state,
            secondNumberOutput: dEval + value,
            firstNumberOutput: dEval,
            firstSymbolOutput: buttons[4][2],
          });

          history.push([secondNumberOutput, dEval]);
        } else {
          temp = isPercent
            ? firstNumberOutput + value
            : secondNumberOutput.slice(0, -1) + value;

          setState({
            ...state,
            secondNumberOutput: temp,
          });
        }

        break;

      case buttons[4][1]:
        if (isNumeric(last) && isDotNotExist) {
          setState({
            ...state,
            secondNumberOutput: secondNumberOutput + value,
          });
        }
        break;

      case buttons[4][2]:
        if (isNumeric(last)) {
          toEval = secondNumberOutput.replace(/÷/, "/").replace(/x/, "*");
          dEval = eval(toEval);

          setState({
            ...state,
            firstNumberOutput: dEval,
            firstSymbolOutput: buttons[4][2],
          });

          history.push([secondNumberOutput, dEval]);
        }
        break;

      default:
        setState({
          ...state,
          secondNumberOutput: secondNumberOutput + value,
        });

        break;
    }
  };

  const _initOutput = () => {
    setState({
      ...state,
      firstSymbolOutput: "",
      firstNumberOutput: "",
      secondNumberOutput: "",
    });
  };

  const _clearHistory = () => {
    setState({ ...state, history: [] });
  };

  const _setToClipboard = () => {
    const { firstNumberOutput } = state;

    const clipboard = firstNumberOutput.toString();
    Clipboard.setString(clipboard);
    _showMessage(`Сохранено в буфер: ${clipboard}`);
  };

  const _showMessage = (message) => {
    setState({ ...state, isMessageVisible: true, message: message });

    setTimeout(() => {
      setState({ ...state, isMessageVisible: false });
    }, 3000);
  };

  const _showSettings = () => {
    setState({ ...state, isSettingsVisible: !state.isSettingsVisible });
  };

  return (
    <StateContext.Provider
      value={{
        ...state,
        _showSettings: _showSettings,
        _saveData: _saveData,
        _clearHistory: _clearHistory,
        _handleEvent: _handleEvent,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
