import { Text, ScrollView, Image, View, ViewStyle, StyleProp } from "react-native";
import React from "react";
import { weatherResponse } from "../types";
import { format as formatDate } from "date-fns";
import PressureIcon from "../../assets/icons/pressure-icon.svg";
import HumidityIcon from "../../assets/icons/humidity-icon.svg";
import { getWeatherIcon } from "../constants";
import { SvgProps } from "react-native-svg";
import useTheme from "../hooks/useTheme";
import themeConfig from "../config/theme";

export default function WeatherData({ data }: { data: weatherResponse | undefined }) {
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

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
					color: theme.white,
					lineHeight: 38.9,
					textAlign: "center",
				}}
			>
				{data?.name}, {data?.sys.country}
			</Text>
			<Text
				style={{
					fontFamily: "sf",
					fontSize: 16,
					marginTop: 4,
					color: theme.white,
					textAlign: "center",
				}}
			>
				{formatDate(new Date(), "EEEE, dd MMMM YYY")}
			</Text>
			<Image
				source={getWeatherIcon(data?.weather[0].icon)}
				style={{ height: 150, width: 150, marginTop: 72 }}
				resizeMode="contain"
			/>
			<Text
				style={{
					fontSize: 56,
					fontFamily: "sfBold",
					color: theme.white,
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
					color: theme.white,
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
				<MoreInfo text={data?.main.pressure} icon={PressureIcon} style={{ marginRight: 40 }} />
				<MoreInfo text={data?.main.humidity} icon={HumidityIcon} />
			</View>
		</ScrollView>
	);
}

const MoreInfo = ({
	text,
	style,
	icon,
}: {
	text?: number;
	style?: StyleProp<ViewStyle>;
	icon: React.FC<SvgProps>;
}) => {
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

	const Icon = icon;

	return (
		<View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
			<Icon />
			<Text style={{ color: theme.white, fontSize: 12, fontFamily: "sf", marginLeft: 8 }}>
				{text}
			</Text>
		</View>
	);
};
