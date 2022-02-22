import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
})

const theme = extendTheme({
  colors: {
    cgray: {
      heavy: "#262524",
      darkest: "#1f2d3d",
      dark: "#3c4858",
      DEFAULT: "#c0ccda",
      light: "#e0e6ed",
      lightest: "#f9fafc",
      900: "#111",
      600: "#333",
      700: "#222",
      500: "#666",
      400: "#444",
      lighter: "#677",
      another: "#ddd",
    },
    white: {
      light: "#fff",
      dull: "#fafafa",
      duller: "#ebebeb",
    },
    green: {
      best: "#01875f",
      darkk: "#056559",
    },
  },
  fonts,
  breakpoints,
})

export default theme
