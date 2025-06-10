module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ]
}