import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { buttons, sysLang, maxLength } from "../initialState";
import { isNumeric, numToPrecision } from "../utils";

export const StateContext = createContext();

export default ({ children }) => {
  const [state, setState] = useState({
    evalNumber: "",
    calcNumber: "",
    history: [],
    isHistory: false,
    isMessage: false,
    isSettings: false,
    message: "",
    buttons: buttons,
    sysLang: sysLang,
  });

  useEffect(() => {
    _retrieveSettings();
  }, []);

  useEffect(() => {
    _storeSettings(state.isHistory);
  }, [state.isHistory]);

  useEffect(() => {
    if (state.isHistory) {
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
        isHistory: value ? value : state.isHistory,
      });

      if (value) _retrieveHistory();
    }
  };

  const _saveData = () => {
    setState({
      ...state,
      isHistory: !state.isHistory,
    });
  };

  const _handleEvent = (value) => {
    const { calcNumber, evalNumber, history } = state;
    let sum, temp, param;

    const last = calcNumber.slice(-1);
    const isNumericLast = isNumeric(last);
    const isDotExist = /[-x÷+].*[.]/.test(calcNumber);
    const isComplete = /[-x÷+][\d.|%]+$/.test(calcNumber);
    const isPercent = /%/.test(calcNumber);

    if (calcNumber.length >= maxLength) {
      _showMessage(`Превышен максимум в ${maxLength} цифр!`);
    }

    switch (value) {
      case buttons[0][0]:
        _showSettings();

        break;

      case buttons[0][1]:
        param = { evalNumber: "", calcNumber: "" };

        break;

      case buttons[0][2]:
        param = {
          calcNumber: calcNumber.slice(0, -1),
          evalNumber: "",
        };

        break;

      case buttons[0][3]:
        if (isComplete) {
          const num = calcNumber.split(/[-+]/).map((m) => +m);
          const operand = calcNumber.match(/[-x÷+]/)[0];

          temp = (num[0] / 100) * num[1];

          if (operand === "+") sum = num[0] + temp;
          if (operand === "-") sum = num[0] - temp;

          param = { evalNumber: sum, calcNumber: calcNumber + value };

          history.push([calcNumber + " (" + temp + ")", sum]);
        }

        break;

      case buttons[1][3]:
      case buttons[2][3]:
      case buttons[3][3]:
      case buttons[4][3]:
        if (isComplete) {
          if (isPercent) {
            param = {
              calcNumber: evalNumber + value,
              evalNumber: "",
            };
          } else {
            sum = _eval(calcNumber);
            param = {
              calcNumber: sum + value,
              evalNumber: evalNumber ? "" : sum,
            };

            history.push([calcNumber, sum]);
          }
        } else {
          param = {
            calcNumber: isNumericLast
              ? calcNumber + value
              : calcNumber.slice(0, -1) + value,
          };
        }

        break;

      case buttons[4][1]:
        if (isDotExist) return;

        temp = isNumericLast ? value : 0 + value;
        param = {
          calcNumber: calcNumber + temp,
          evalNumber: "",
        };

        break;

      case buttons[4][2]:
        if (!!evalNumber) return;
        if (isComplete) {
          sum = _eval(calcNumber);
          param = { evalNumber: sum };

          history.push([calcNumber, sum]);
        }

        break;

      default:
        param = { calcNumber: calcNumber + value, evalNumber: "" };

        break;
    }

    setState({
      ...state,
      ...param,
    });
  };

  const _eval = (str) => {
    let sum;

    const operand = str.match(/[-x÷+]/)[0];
    const arr = str.split(operand);

    if (operand === "+") sum = arr.reduce((a, b) => +a + +b);
    if (operand === "-") sum = arr.reduce((a, b) => +a - +b);
    if (operand === "x") sum = arr.reduce((a, b) => +a * +b);
    if (operand === "÷") sum = arr.reduce((a, b) => +a / +b);

    return numToPrecision(sum);
  };

  const _clearHistory = () => {
    setState({ ...state, history: [] });
  };

  const _showMessage = (message) => {
    setState({ ...state, isMessage: true, message: message });

    setTimeout(() => {
      setState({ ...state, isMessage: false });
    }, 3000);
  };

  const _showSettings = () => {
    setState({ ...state, isSettings: !state.isSettings });
  };

  return (
    <StateContext.Provider
      value={{
        ...state,
        _showSettings: _showSettings,
        _showMessage: _showMessage,
        _saveData: _saveData,
        _clearHistory: _clearHistory,
        _handleEvent: _handleEvent,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
