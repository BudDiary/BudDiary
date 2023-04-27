module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "bud-blue": "#ABC4FF",
        "bud-pink": "#FB557C",
        "bud-green": "#BEE5BF",
        "bud-yellow": "#FAEED3",
        "bud-white": "#FAFAFA",
        "bud-black": "#252A34",
      },
    },
    fontFamily: {
      berry: ["Goryeong Strawberry"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
