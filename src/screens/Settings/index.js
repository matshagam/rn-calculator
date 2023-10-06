import React, { useContext } from "react";
import { Image, Modal, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StateContext } from "../../store/StateProvider";
import { ThemeContext } from "../../store/ThemeProvider";
import Separator from "./components/Separator";
import DONATE from "../../../assets/donate.png";
import SBER_C from "../../../assets/sber_c.png";
import SBER_B from "../../../assets/sber_b.png";
import { openUrl } from "../../utils";

export default () => {
  const {
    sysLang,
    isSettings,
    isHistory,
    _showSettings,
    _saveData,
    _clearHistory,
  } = useContext(StateContext);
  const { theme, styles, themeColor, _changeThemeColor } =
    useContext(ThemeContext);

  const historySaved = {
    ru_RU: `История сохраняется`,
    en_US: `The history is saved"`,
  };

  const historyClear = {
    ru_RU: "Очистить историю",
    en_US: "Clear history",
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
    <Modal animationType="slide" visible={isSettings}>
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
              color: theme.primaryColorTxt,
              fontSize: 20,
              marginBottom: 20,
              fontWeight: "500",
            }}
          >
            {title[sysLang]}
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
              {historySaved[sysLang]}
            </Text>
            <TouchableOpacity
              style={{
                opacity: 0.5,
                width: 35,
                padding: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
              hitSlop={styles.hitSlop}
              onPress={() => _saveData()}
            >
              <Text
                style={{
                  color: theme.secondaryColorTxt,
                  fontWeight: 700,
                }}
              >
                {isHistory ? "Да" : "Нет"}
              </Text>
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
              {historyClear[sysLang]}
            </Text>
            <TouchableOpacity
              style={{
                opacity: 0.5,
                alignItems: "center",
                width: 35,
              }}
              hitSlop={styles.hitSlop}
              onPress={() => _clearHistory()}
            >
              <Ionicons
                size={23}
                color={theme.secondaryColorTxt}
                name="ios-trash"
              />
            </TouchableOpacity>
          </View>
          <Separator />
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
              {themeMode[sysLang]}
            </Text>
            <TouchableOpacity
              style={{ opacity: 0.5, width: 35, alignItems: "center" }}
              hitSlop={styles.hitSlop}
              onPress={() => _changeThemeColor()}
            >
              <Ionicons
                size={23}
                name={themeColor === "light" ? "ios-moon" : "ios-sunny"}
                color={theme.secondaryColorTxt}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              rowGap: 10,
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 3,
                padding: 12,
              }}
            >
              <Image style={{ height: 150, width: 150 }} source={DONATE} />
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f2f3f7",
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 3,
              }}
              hitSlop={styles.hitSlop}
              onPress={() => openUrl("https://pay.mysbertips.ru/32127605")}
            >
              <Text style={{ fontSize: 16 }}>
                Страница для донатов в Сбер Чаевые
              </Text>
              <Image
                style={{ height: 23, width: 23 }}
                source={themeColor === "light" ? SBER_C : SBER_B}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center", opacity: 0.5 }}
          hitSlop={styles.hitSlop}
          onPress={() => _showSettings()}
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
