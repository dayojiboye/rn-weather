import React from "react";
import ThemeProvider from "./src/context/theme-context";
import AppEntry from "./AppEntry";

export default function App() {
	return (
		<ThemeProvider>
			<AppEntry />
		</ThemeProvider>
	);
}
