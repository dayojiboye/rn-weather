import { Text, ScrollView, Image, View } from "react-native";
import React from "react";
import { weatherResponse } from "../types";
import { format as formatDate } from "date-fns";
import PressureIcon from "../../assets/icons/pressure-icon.svg";
import HumidityIcon from "../../assets/icons/humidity-icon.svg";

export default function WeatherData({ data }: { data: weatherResponse | undefined }) {
	return (
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{
				flex: 1,
				paddingVertical: 64,
				paddingHorizontal: 16,
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontFamily: "sfBold",
					fontSize: 32,
					color: "white",
					lineHeight: 38.9,
					textAlign: "center",
				}}
			>
				{data?.name}, {data?.sys.country}
			</Text>
			<Text
				style={{ fontFamily: "sf", fontSize: 16, marginTop: 4, color: "#fff", textAlign: "center" }}
			>
				{formatDate(new Date(), "EEEE, dd MMMM YYY")}
			</Text>
			<Image
				source={{ uri: `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png` }}
				style={{ height: 70, width: 70, marginTop: 101 }}
			/>
			<Text
				style={{
					fontSize: 56,
					fontFamily: "sfBold",
					color: "#fff",
					marginVertical: 18,
					textAlign: "center",
				}}
			>
				{data?.main?.temp?.toFixed(1)}
				<Text style={{ fontSize: 40, fontFamily: "sf" }}>&deg;C</Text>
			</Text>
			<Text
				style={{
					textAlign: "center",
					color: "#fff",
					fontSize: 16,
					fontFamily: "sf",
					textTransform: "capitalize",
				}}
			>
				{data?.weather[0].description}
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: 18,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginRight: 40,
					}}
				>
					<PressureIcon />
					<Text style={{ color: "#fff", fontSize: 12, fontFamily: "sf", marginLeft: 8 }}>
						{data?.main.pressure}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<HumidityIcon />
					<Text style={{ color: "#fff", fontSize: 12, fontFamily: "sf", marginLeft: 8 }}>
						{data?.main.humidity}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
