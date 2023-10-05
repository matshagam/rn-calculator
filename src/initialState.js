import {
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  NativeModules,
} from "react-native";

export const width = Dimensions.get("window").width;

export const sysLang =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

const lang = {
  ru_RU: ["НАС", "ОЧИ", "УДА"],
  en_US: ["SET", "CLR", "DEL"],
};

export const buttons = [
  [lang[sysLang][0], lang[sysLang][1], lang[sysLang][2], "%"],
  [7, 8, 9, "÷"],
  [4, 5, 6, "x"],
  [1, 2, 3, "+"],
  [0, ".", "=", "-"],
];

export const initialOutput = "";
export const maxLength = 17;

export const theme = {
  light: {
    primaryColor: "#fff",
    primaryColorTxt: "#000",
    secondaryColorTxt: "#7f8c8d",
  },
  dark: {
    primaryColor: "#000",
    primaryColorTxt: "#fff",
    secondaryColorTxt: "#7f8c8d",
  },
};

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    flex: 1,
    flexDirection: "column",
  },
  separator: {
    width: "100%",
    height: 1,
    marginBottom: 19.5,
    marginTop: 19.5,
  },
  contHistory: {
    flex: 0.45,
  },
  contOutput: {
    height: 140,
  },
  contButtons: {
    flex: 0.9,
  },
  placeHolderOutput: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  txtDefaultOutput: {
    fontFamily: "Helvetica-Light",
    fontSize: 30,
    width: "auto",
  },
  containerHistory: {
    flex: 1,
  },
  txtExpression: {
    fontFamily: "Helvetica-Light",
    fontSize: 13,
  },
  txtResult: {
    color: "#27ae60",
    fontFamily: "Helvetica-Light",
    fontSize: 20,
  },
  historyCont: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "transparent",
  },
  expressionCont: {
    flex: 0.7,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  resultCont: {
    flex: 0.3,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  emptyHistoryCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtEmptyHistory: {
    fontFamily: "Helvetica-Light",
    fontSize: 15,
  },

  buttonsLeftSide: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.5,
  },
  modalView: {
    padding: 22,
    flex: 1,
    justifyContent: "space-between",
  },
  containerMessage: {
    backgroundColor: "#F6F6F6",
    position: "absolute",
    flex: 1,
    bottom: 0,
    width: "100%",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontFamily: "Helvetica-Light",
    fontSize: 16,
  },
  containerNumbers: {
    flex: 1,
  },
  txtDefault: {
    fontFamily: "Helvetica-Light",
    fontSize: 20,
  },
  contRow: {
    flex: 1,
    flexDirection: "row",
  },
  contButton: {
    flex: 1,
    ...Platform.select({
      ios: {
        width: width / 4,
      },
    }),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  actionStyle: {
    backgroundColor: "#F2F2F2",
    borderColor: "#ffff",
  },
  equallyStyle: {
    backgroundColor: "#FECBCC",
  },
  numeralStyle: {
    backgroundColor: "#D7E4F5",
  },
});
