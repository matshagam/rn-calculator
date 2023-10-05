import { Linking } from "react-native";

const isNumeric = (n) => !isNaN(n);

const openUrl = async (url) => await Linking.openURL(url);

export { isNumeric, openUrl };
