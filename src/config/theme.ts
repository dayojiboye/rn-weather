import { themeMode } from "../enums";

const lightTheme = {
	primary: "#000",
	secondary: "#fff",
	progressBg: "rgba(0, 0, 0, 0.8)",
	background: "rgba(0, 39, 98, 0.83)",
	faded: "#ccc",
	placeholder: "#80868b",
	inputBg: "#f3f0f0",
	muted: "#eee",
	disabled: "#949191",
	white: "#fff",
	black: "#000",
};

const darkTheme = {
	primary: "#fff",
	secondary: "#000",
	progressBg: "rgb(255, 255, 255)",
	background: "rgba(0, 0, 0, 0.83)",
	faded: "#ccc",
	placeholder: "#80868b",
	inputBg: "#f3f0f0",
	muted: "#eee",
	disabled: "#949191",
	white: "#fff",
	black: "#000",
};

const themeConfig = (value: string) => {
	if (value === themeMode.DARK) {
		return darkTheme;
	} else {
		return lightTheme;
	}
};

export default themeConfig;
