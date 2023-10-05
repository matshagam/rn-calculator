import { Linking } from "react-native";

const isNumeric = (n) => !isNaN(n);

const openUrl = async (url) => await Linking.openURL(url);

const numToPrecision = (num) => {
  return Number.isInteger(num) ? num : num.toFixed(2);
};

export { isNumeric, openUrl, numToPrecision };
