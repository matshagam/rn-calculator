import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { buttons, sysLang, initialOutput, maxLength } from "../initialState";
import { isNumeric } from "../utils";

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
    const { evalNumber, calcNumber, history } = state;
    let sum, dEval, tEval, toEval, temp;

    const last = calcNumber.slice(-1);

    if (!isNumeric(last) && value === last) return;

    const isPercent = /[%]/.test(last);
    const isEachExist = /[+]|[-]/.test(calcNumber);
    const isAllExist = /[+]|[-]|[÷]|[x]/.test(calcNumber);
    const isDotNotExist = !/[+|-|x|÷].*[.]/.test(calcNumber);

    if (calcNumber.length >= maxLength) {
      _showMessage(`Превышен максимум в ${maxLength} цифр!`);
    }

    switch (value) {
      case buttons[0][0]:
        _showSettings();

        break;

      case buttons[0][1]:
        _initOutput();

        break;

      case buttons[0][2]:
        setState({
          ...state,
          calcNumber:
            calcNumber.length === 1 ? initialOutput : calcNumber.slice(0, -1),
        });

        break;

      case buttons[0][3]:
        if (isEachExist && isNumeric(last)) {
          dEval = eval(calcNumber);
          tEval = dEval / 100;
          sum = (dEval + tEval).toPrecision(2);

          setState({
            ...state,
            evalNumber: sum,
            calcNumber: calcNumber + value,
            history,
          });

          history.push([calcNumber + " (" + tEval + ")", sum]);
        }

        break;

      case buttons[1][3]:
      case buttons[2][3]:
      case buttons[3][3]:
      case buttons[4][3]:
        if (isNumeric(last)) {
          if (isAllExist) {
            toEval = calcNumber.replace(/[÷]/, "/").replace(/[x]/, "*");
            dEval = eval(toEval).toPrecision(2);
            temp = { calcNumber: dEval + value };

            if (!evalNumber) {
              history.push([calcNumber, dEval]);
              temp = {
                ...temp,
                evalNumber: dEval,
              };
            }
          } else temp = { calcNumber: calcNumber + value };
        } else {
          temp = {
            calcNumber: isPercent
              ? evalNumber + value
              : calcNumber.slice(0, -1) + value,
          };
        }

        setState({ ...state, ...temp });

        break;

      case buttons[4][1]:
        if (isNumeric(last) && isDotNotExist) {
          setState({
            ...state,
            calcNumber: calcNumber + value,
          });
        }
        break;

      case buttons[4][2]:
        if (isNumeric(last) && !evalNumber) {
          toEval = calcNumber.replace(/÷/, "/").replace(/x/, "*");
          dEval = eval(toEval).toPrecision(2);

          setState({
            ...state,
            evalNumber: dEval,
          });

          history.push([calcNumber, dEval]);
        }
        break;

      default:
        setState({
          ...state,
          calcNumber: calcNumber + value,
          evalNumber: "",
        });

        break;
    }
  };

  const _initOutput = () => {
    setState({
      ...state,
      evalNumber: "",
      calcNumber: "",
    });
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
