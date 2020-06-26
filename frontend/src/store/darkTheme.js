import { createMuiTheme } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F68C8",
    },
    secondary: {
      main: "#C83F68",
    },
    type: "dark",
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#000",
  },
});

export default darkTheme;
