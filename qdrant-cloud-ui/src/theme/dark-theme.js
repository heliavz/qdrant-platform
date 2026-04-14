import { primary, blue, neutral, grey } from "./colors";

const darkPalette = {
  common: {
    black: "#000000ff",
    white: "#ffffffff",
  },
  text: {
    primary: neutral[1],
    secondary: neutral[400],
    disabled: neutral[700],
  },
  primary: {
    main: primary[300],
    dark: primary[500],
    light: primary[200],
    contrastText: neutral[950],
  },
  secondary: {
    main: blue[300],
    dark: blue[700],
    light: blue[100],
    contrastText: neutral[950],
  },
  error: {
    contrastText: "#fcfdff",
    main: "#f44336",
    dark: "#d32f2f",
    light: "#e57373",
  },
  warning: {
    contrastText: "#fcfdff",
    main: "#ffa726",
    dark: "#f57c00",
    light: "#ffb74d",
  },
  info: {
    contrastText: "#fcfdff",
    main: "#29b6f6",
    dark: "#0288d1",
    light: "#4fc3f7",
  },
  success: {
    main: "#26a69a",
    dark: "#00796b",
    light: "#4db6ac",
    contrastText: "#fcfdff",
  },
  action: {
    active: "#fcfdff8f",
    hover: "#fcfdff14",
    selected: "#fcfdff29",
    focus: "#fcfdff1f",
    disabled: "#fcfdff61",
    disabledBackground: "#fcfdff1f",
  },
  background: {
    default: neutral[950],
    paper: "#111824ff",
    card: "#111824ff",
    paperElevation0: neutral[950],
    paperElevation1: "#111824ff",
    paperElevation2: "#141a2aff",
    paperElevation3: "#171d2cff",
  },
  divider: "#ffffff1f",
  avatarFill: grey[600],
  snackbarFill: "#1e2433ff",
  tooltipFill: "#616161e5",
  backdropFill: "#00000080",
  appBarDefaultFill: "#191f2eff",
};

export const darkThemeOptions = {
  palette: darkPalette,
};
