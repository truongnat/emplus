/** @type {import('tailwindcss').Config} */
module.exports = {
  // All app source files scanned for class names
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        heading: ["BeVietnamPro_700Bold"],
        body: ["BeVietnamPro_400Regular"],
        medium: ["BeVietnamPro_500Medium"],
        bold: ["BeVietnamPro_700Bold"],
        mono: ["RobotoMono_400Regular"],
        monoBold: ["RobotoMono_700Bold"],
      },
      colors: {
        primary: "#ec1334",
      }
    },
  },
  plugins: [],
};
