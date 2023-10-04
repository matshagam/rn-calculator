import React, { useContext } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";

export const Settings = () => {
  const {
    deviceLanguage,
    isSettingsVisible,
    isHistorySaved,
    _showSettings,
    _saveData,
  } = useContext(StateContext);
  const { theme, styles, themeColor, _changeThemeColor } =
    useContext(ThemeContext);

  const historySaved = {
    ru_RU: `История ${isHistorySaved ? "" : "не"} сохраняется`,
    en_US: `The history is ${isHistorySaved ? "" : "not"} saved"`,
  };

  const themeMode = {
    ru_RU: `${themeColor === "light" ? "Дневной" : "Ночной"}  режим`,
    en_US: `${themeColor === "light" ? "Day" : "Night"} mode`,
  };

  const title = {
    ru_RU: "Настройки",
    en_US: "Settings",
  };

  return (
    <Modal animationType="slide" visible={isSettingsVisible}>
      <View
        style={[
          styles.modalView,
          {
            backgroundColor: theme.primaryColor,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            paddingTop: styles.container.paddingTop,
          }}
        >
          <Text
            style={{
              color: theme.secondaryColorTxt,
              alignSelf: "center",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            {title[deviceLanguage]}
          </Text>
          <View
            style={{
              width: "100%",
              height: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.secondaryColorTxt,
              }}
            >
              {historySaved[deviceLanguage]}
            </Text>
            <TouchableOpacity
              style={{ opacity: 0.5, width: 23, alignItems: "center" }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => {
                _saveData();
              }}
            >
              <Ionicons
                size={23}
                color={theme.secondaryColorTxt}
                name={isHistorySaved ? "ios-cloud" : "ios-cloud-outline"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.secondaryColorTxt,
              }}
            >
              {themeMode[deviceLanguage]}
            </Text>
            <TouchableOpacity
              style={{ opacity: 0.5, width: 23, alignItems: "center" }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => {
                _changeThemeColor();
              }}
            >
              <Ionicons
                size={23}
                name={themeColor === "light" ? "ios-moon" : "ios-sunny"}
                color={theme.secondaryColorTxt}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center", opacity: 0.5 }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            _showSettings();
          }}
        >
          <Ionicons
            size={35}
            name="ios-arrow-down"
            color={theme.secondaryColorTxt}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
