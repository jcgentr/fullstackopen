import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, { fontFamily: theme.fonts.main }];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
