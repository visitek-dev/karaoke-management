import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1a43a1",
    },
    secondary: {
      main: "#F94078",
    },
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#000",
  },
});

export default theme;
