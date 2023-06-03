import { ActivityIndicator, ImageBackground, ScrollView, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AppBackground from "../assets/images/app_background.png";
import { LinearGradient } from "expo-linear-gradient";
import AppBar from "../components/app-bar";
import { API } from "../config";
import apiEndpoints from "../config/api-endpoints";
import { weatherResponse } from "../types";
import { format as formatDate } from "date-fns";
import { appState } from "../enums";
import WeatherData from "../components/weather-data";

export default function Home() {
	const [currentState, setCurrentState] = React.useState<string>(appState.IDLE);
	const [weather, setWeather] = React.useState<weatherResponse | undefined>();

	const fetchWeather = async () => {
		setCurrentState(appState.LOADING);
		try {
			const response = await API.get(apiEndpoints.getWeather("lagos"));
			const { status, data } = response || {};
			if (status === 200) {
				setWeather(data);
				setCurrentState(appState.SUCCESS);
			}
		} catch (error) {
			console.log(error);
			setCurrentState(appState.ERROR);
		}
	};

	React.useEffect(() => {
		fetchWeather();
	}, []);

	const renderView = (): JSX.Element | null => {
		switch (currentState) {
			case appState.LOADING:
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
						<View
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.8)",
								width: 80,
								height: 80,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
							}}
						>
							<ActivityIndicator />
						</View>
					</View>
				);

			case appState.ERROR:
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

			case appState.SUCCESS:
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
						<WeatherData data={weather} />
					</ScrollView>
				);

			default:
				return null;
		}
	};

	return (
		<>
			<StatusBar style="auto" />
			<ImageBackground source={AppBackground} style={{ flex: 1 }}>
				<LinearGradient
					colors={["rgba(0, 39, 98, 0.75)", "rgba(0, 39, 98, 0.83)"]}
					style={{ flex: 1, position: "relative" }}
				>
					<AppBar />
					{renderView()}
				</LinearGradient>
			</ImageBackground>
		</>
	);
}
