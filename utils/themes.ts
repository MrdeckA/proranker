import { type ThemeDefinition } from "vuetify";
import colors from "vuetify/util/colors";

// String that represents the name of the theme I am using
export const LIGHT_THEME = "light";
// Light mode theme
export const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.deepPurple.accent4,
    // background: "#FFFFFF",
    // surface: "#FFFFFF",
    // secondary: twColors.purple[600],
    // error: twColors.red[500],
    // info: twColors.blue[500],
    // success: twColors.emerald[500],
    // warning: twColors.amber[500],
  },
};

// String that represents the name of the dark theme I am using
export const DARK_THEME = "dark";
// Dark mode theme
export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "blue",
    // background: twColors.slate[950],
    // surface: twColors.slate[900],
    // secondary: twColors.purple[500],
    // error: twColors.red[500],
    // info: twColors.blue[500],
    // success: twColors.emerald[500],
    // warning: twColors.amber[500],
  },
};
