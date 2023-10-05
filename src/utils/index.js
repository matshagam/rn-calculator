import * as Clipboard from "expo-clipboard";

const isNumeric = (n) => !isNaN(n);

const copyToClipboard = async ({ text }) => {
  await Clipboard.setStringAsync(text);
};

export { isNumeric, copyToClipboard };
