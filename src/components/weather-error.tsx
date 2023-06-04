import { View, Text } from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";
import themeConfig from "../config/theme";

export default function WeatherError() {
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					color: theme.white,
					fontFamily: "sfMedium",
					fontSize: 20,
					textAlign: "center",
					lineHeight: 32,
				}}
			>
				{"Please enter a valid city! \n 🧐"}
			</Text>
		</View>
	);
}
