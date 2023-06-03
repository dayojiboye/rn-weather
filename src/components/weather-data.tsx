import { View, Text } from "react-native";
import React from "react";
import { weatherResponse } from "../types";

export default function WeatherData({ data }: { data: weatherResponse | undefined }) {
	return (
		<Text
			style={{
				fontFamily: "sfBold",
				fontSize: 32,
				color: "white",
				lineHeight: 38.9,
				marginBottom: 4,
			}}
		>
			{/* {formatDate(new Date(), "hh:mm a")} */}
			{data?.name}
		</Text>
	);
}
