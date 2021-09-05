// TODO: add to tailwind.config.js--->
// text-red-primary--> hex value
// text-gray-base--> hex value
// border-gray-primary--> hex value
// bg-blue-medium --> hex value
// text-blue-medium --> hex value

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    colors: {
      white: "#ffffff",
      blue: {
        medium: "#005c98",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
      red: {
        primary: "#ed4956",
      },
    },
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
  },
  variants: {
    display: ["group-hover"],
  },
};
