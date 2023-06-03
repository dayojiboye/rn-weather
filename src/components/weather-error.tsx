import { View, Text } from "react-native";
import React from "react";

export default function WeatherError() {
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
					color: "white",
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
