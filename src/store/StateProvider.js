import React, { createContext, useEffect, useState } from "react";
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

import {
  buttons,
  initialOutput,
  maxLength,
  theme,
  styles,
} from "../initialState";

export const StateContext = createContext();

export default ({ children }) => {
  const colorScheme = useColorScheme();

  const [state, setState] = useState({
    firstSymbolOutput: "",
    firstNumberOutput: initialOutput,
    secondSymbolOutput: "",
    secondNumberOutput: initialOutput,
    history: [],
    saveHistory: false,
    messageVisible: false,
    settingsVisible: false,
    message: "",
    themeColor: colorScheme,
    theme: theme[colorScheme],
    styles: styles,
    buttons: buttons,
  });

  useEffect(() => {
    _retrieveData();
    _retrieveSettings();
  }, []);

  useEffect(() => {
    _storeData(state.themeColor);
  }, [state.themeColor]);

  useEffect(() => {
    _storeSettings(state.saveHistory);
  }, [state.saveHistory]);

  useEffect(() => {
    if (state.saveHistory) {
      _storeHistory(state.history);
    }
  }, [state.history]);

  const _storeHistory = async (props) => {
    await AsyncStorage.setItem("history", JSON.stringify(props));
  };

  const _storeData = async (props) => {
    await AsyncStorage.setItem("themeColor", props);
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
        saveHistory: value ? value : state.saveHistory,
      });

      if (value) _retrieveHistory();
    }
  };

  const _retrieveData = async () => {
    const value = await AsyncStorage.getItem("themeColor");

    if (value) {
      setState({
        ...state,
        themeColor: value,
        theme: value === "light" ? state.theme : theme.dark,
      });
    }
  };

  const _saveData = () => {
    setState({
      ...state,
      saveHistory: !state.saveHistory,
    });
  };

  const _handleEvent = (value) => {
    console.log("❗_handleEvent", { value });
    const { firstSymbolOutput, secondSymbolOutput, secondNumberOutput } = state;
    if (
      (typeof value === "number" && !secondNumberOutput.includes("%")) ||
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
    setState({ ...state, messageVisible: true, message: message });

    setTimeout(() => {
      setState({ ...state, messageVisible: false });
    }, 3000);
  };

  const _showSettings = () => {
    setState({ ...state, settingsVisible: !state.settingsVisible });
  };

  const _changeThemeColor = () => {
    setState({
      ...state,
      themeColor: state.themeColor === "dark" ? "light" : "dark",
      theme: state.theme === theme.light ? theme.dark : theme.light,
    });
  };

  const _styledButtons = (rowIndex, colIndex) => {
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

  return (
    <StateContext.Provider
      value={{
        firstSymbolOutput: state.firstSymbolOutput,
        firstNumberOutput: state.firstNumberOutput,
        secondSymbolOutput: state.secondSymbolOutput,
        secondNumberOutput: state.secondNumberOutput,
        history: state.history,
        messageVisible: state.messageVisible,
        settingsVisible: state.settingsVisible,
        message: state.message,
        themeColor: state.themeColor,
        theme: state.theme,
        styles: state.styles,
        buttons: state.buttons,
        saveHistory: state.saveHistory,
        _showSettings: _showSettings,
        _saveData: _saveData,
        _changeThemeColor: _changeThemeColor,
        _clearHistory: _clearHistory,
        _handleEvent: _handleEvent,
        _styledButtons: _styledButtons,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
