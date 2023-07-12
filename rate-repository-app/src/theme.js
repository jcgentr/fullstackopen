import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textPrimaryLight: "#555b61",
    textSecondary: "#eeeeee",
    primary: "#0366d6",
  },
  background: {
    primary: "#eeeeee",
    secondary: "#24292e",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "serif",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
