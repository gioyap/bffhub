// src/theme.ts
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#e61e84", // Custom primary color
		text: "#333", // Customize the text color if needed
		placeholder: "#888", // Customize placeholder text color if needed
		background: "#fff", // Background color if needed
		surface: "#fff", // Surface color if needed
		accent: "#e61e84", // Accent color for other components
	},
};
