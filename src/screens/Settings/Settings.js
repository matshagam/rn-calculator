import React, { useContext } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";

export const Settings = () => {
  const { settingsVisible, saveHistory, _showSettings, _saveData } =
    useContext(StateContext);
  const { theme, styles } = useContext(ThemeContext);

  return (
    <Modal animationType="slide" visible={settingsVisible}>
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
            НАСТРОЙКИ КАЛЬКУЛЯТОРА
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
              {saveHistory ? "История сохраняется" : "История не сохраняется"}
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
                name={saveHistory ? "ios-cloud" : "ios-cloud-outline"}
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
