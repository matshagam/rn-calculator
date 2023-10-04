import React, { createContext, useEffect, useState } from "react";
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  buttons,
  deviceLanguage,
  initialOutput,
  maxLength,
} from "../initialState";

export const StateContext = createContext();

export default ({ children }) => {
  const [state, setState] = useState({
    firstSymbolOutput: "",
    firstNumberOutput: initialOutput,
    secondSymbolOutput: "",
    secondNumberOutput: initialOutput,
    history: [],
    isHistorySaved: false,
    isMessageVisible: false,
    isSettingsVisible: false,
    message: "",
    buttons: buttons,
    deviceLanguage: deviceLanguage,
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
    console.log("❗_handleEvent", { value });
    const { firstSymbolOutput, secondSymbolOutput, secondNumberOutput } = state;
    if (
      (!isNaN(value) && !secondNumberOutput.includes("%")) ||
      (value === "." && !secondNumberOutput.includes(value)) ||
      (value === "%" && !secondNumberOutput.includes(value))
    ) {
      _concatToNumberOutput(value);
    } else {
      switch (value) {
        case buttons[1][3]:
        case buttons[2][3]:
        case buttons[3][3]:
        case buttons[4][3]:
          if (firstSymbolOutput !== "=" || secondSymbolOutput) {
            _evaluate();
            _concatToSymbolOutput(value);
          }
          break;

        case buttons[0][0]:
          _setToClipboard();
          break;

        case buttons[0][1]:
          _initOutput();
          break;

        case buttons[0][2]:
          if (secondNumberOutput.length === 1) {
            setState({ ...state, secondNumberOutput: initialOutput });
          } else {
            _replaceLastIndex("");
          }
          break;

        case buttons[4][2]:
          _evaluate();
          setState({
            ...state,
            firstSymbolOutput: value,
            secondSymbolOutput: "",
          });
          break;
      }
    }
  };

  const _concatToNumberOutput = (value) => {
    const { secondNumberOutput } = state;
    console.log("❗_concatToNumberOutput", { value, secondNumberOutput });
    if (secondNumberOutput.length >= maxLength) {
      _showMessage(`Превышен максимум в ${maxLength} цифр!`);
    } else {
      if (secondNumberOutput !== initialOutput) {
        setState({
          ...state,
          secondNumberOutput: secondNumberOutput + "" + value + "",
        });
      } else {
        setState({ ...state, secondNumberOutput: value + "" });
      }
    }
  };

  const _concatToSymbolOutput = (value) => {
    const { secondSymbolOutput } = state;
    console.log("❗_concatToSymbolOutput", { secondSymbolOutput, value });
    if (secondSymbolOutput) {
      setState({
        ...state,
        secondSymbolOutput: value + "",
        firstSymbolOutput: "",
      });
    } else {
      setState({
        ...state,
        secondSymbolOutput: "" + value,
        firstSymbolOutput: "",
      });
    }
  };

  const _replaceLastIndex = (value) => {
    const { secondNumberOutput } = state;

    let str1 = secondNumberOutput.replace(/.$/, value);
    setState({ ...state, secondNumberOutput: str1 });
  };

  const _evaluate = () => {
    const {
      firstNumberOutput,
      secondNumberOutput,
      secondSymbolOutput,
      history,
    } = state;

    let aHistory = [...history];
    let includesX = secondSymbolOutput.includes("x");
    let includesPercent = secondNumberOutput.includes("%");
    let dEval;
    let tEval;

    try {
      if (secondNumberOutput !== initialOutput) {
        if (includesPercent) {
          tEval =
            eval(
              firstNumberOutput +
                secondSymbolOutput.replace(/[+]|[-]|[x]/g, "*") +
                secondNumberOutput.slice(0, -1)
            ) / 100;

          if (includesX) {
            aHistory.push([
              firstNumberOutput + secondSymbolOutput + secondNumberOutput,
              tEval,
            ]);
          } else {
            dEval = eval(firstNumberOutput + secondSymbolOutput + tEval);
            aHistory.push([
              firstNumberOutput +
                secondSymbolOutput +
                secondNumberOutput +
                " (" +
                tEval +
                ")",
              dEval,
            ]);
          }

          setState({
            ...state,
            firstNumberOutput: includesX ? tEval : dEval,
            secondNumberOutput: initialOutput,
            history: aHistory,
          });
        } else {
          if (
            firstNumberOutput !== initialOutput &&
            isNaN(secondSymbolOutput)
          ) {
            dEval = eval(
              firstNumberOutput +
                _convertToMathExpression(secondSymbolOutput) +
                secondNumberOutput
            );

            aHistory.push([
              firstNumberOutput + secondSymbolOutput + secondNumberOutput,
              dEval,
            ]);

            setState({
              ...state,
              firstNumberOutput: dEval,
              secondNumberOutput: initialOutput,
              history: aHistory,
            });
          } else {
            setState({
              ...state,
              firstNumberOutput: secondNumberOutput,
              secondNumberOutput: initialOutput,
            });
          }
        }
      }
    } catch (exception) {
      _showMessage(`${exception}`);
    }
  };

  const _convertToMathExpression = (value) => {
    let strTemp = value.replace(
      new RegExp(_escapeRegExp(buttons[1][3]), "g"),
      "/"
    );
    strTemp = strTemp.replace(
      new RegExp(_escapeRegExp(buttons[2][3]), "g"),
      "*"
    );
    return strTemp;
  };

  const _escapeRegExp = (str) => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  const _initOutput = () => {
    setState({
      ...state,
      firstSymbolOutput: "",
      firstNumberOutput: initialOutput,
      secondSymbolOutput: "",
      secondNumberOutput: initialOutput,
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
