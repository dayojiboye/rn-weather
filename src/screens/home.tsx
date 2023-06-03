import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AppBackground from "../../assets/images/app_background.png";
import { LinearGradient } from "expo-linear-gradient";
import AppBar from "../components/app-bar";
import { API } from "../config";
import apiEndpoints from "../config/api-endpoints";
import { weatherResponse } from "../types";
import { appState } from "../enums";
import WeatherData from "../components/weather-data";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import AppBackdrop from "../components/app-backdrop";
import * as Location from "expo-location";
import LocationPermissionDenied from "../components/location-permission-denied";
import AppProgressIndicator from "../components/app-progress-indicator";
import WeatherError from "../components/weather-error";
import AppButton from "../components/app-button";

export default function Home({
	location,
	locationErr,
	isLocationLoading,
}: {
	location: Location.LocationObject | null;
	locationErr: string | null;
	isLocationLoading: boolean;
}) {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const [currentState, setCurrentState] = React.useState<string>(appState.IDLE);
	const [weather, setWeather] = React.useState<weatherResponse | undefined>();
	const [city, setCity] = React.useState<string>("");

	const isSubmissionAllowed: boolean = city.length >= 2;

	const fetchWeather = async () => {
		if (!location) return;
		setCurrentState(appState.LOADING);
		try {
			const response = await API.get(
				apiEndpoints.getWeather(location?.coords.latitude, location?.coords.longitude)
			);
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

	const fetchCityWeather = async () => {
		closeBottomsheet();
		setCurrentState(appState.LOADING);
		try {
			const response = await API.get(apiEndpoints.getCityWeather(city));
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

	const openBottomsheet = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const closeBottomsheet = React.useCallback(() => {
		setCity("");
		bottomSheetModalRef.current?.close();
	}, []);

	React.useEffect(() => {
		// console.log(JSON.stringify(location));
		if (location) fetchWeather();
	}, [location]);

	const renderView = (): JSX.Element | null => {
		switch (currentState) {
			case appState.LOADING:
				return <AppProgressIndicator />;

			case appState.ERROR:
				return <WeatherError />;

			case appState.SUCCESS:
				return <WeatherData data={weather} />;

			default:
				return null;
		}
	};

	return (
		<>
			<StatusBar style="light" />
			<ImageBackground source={AppBackground} style={{ flex: 1 }}>
				<LinearGradient
					colors={["rgba(0, 39, 98, 0.83)", "rgba(0, 39, 98, 0.83)"]}
					style={{ flex: 1, position: "relative" }}
				>
					<AppBar disabled={isLocationLoading} openBottomsheet={openBottomsheet} />
					{isLocationLoading ? (
						<AppProgressIndicator />
					) : location || currentState !== appState.IDLE ? (
						renderView()
					) : (
						<LocationPermissionDenied locationErr={locationErr} />
					)}
				</LinearGradient>
			</ImageBackground>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={["28%"]}
				handleIndicatorStyle={{ backgroundColor: "#ccc", width: 40 }}
				backdropComponent={(props) => <AppBackdrop onPress={closeBottomsheet} {...props} />}
				containerStyle={{ borderRadius: 50 }}
			>
				<View style={{ paddingTop: 16, paddingHorizontal: 20, flex: 1 }}>
					<BottomSheetTextInput
						placeholder="Enter City"
						placeholderTextColor="#80868b"
						style={{
							fontSize: 16,
							paddingHorizontal: 16,
							paddingVertical: 20,
							backgroundColor: "#f3f0f0",
							borderRadius: 8,
						}}
						onChangeText={(value) => setCity(value)}
					/>
					<AppButton
						label="Get Weather"
						disabled={!isSubmissionAllowed}
						activeOpacity={0.8}
						style={{
							marginTop: 16,
							backgroundColor: !isSubmissionAllowed ? "#eee" : "#000",
							height: 60,
							width: "100%",
						}}
						labelStyle={{ color: !isSubmissionAllowed ? "#949191" : "#fff" }}
						onPress={fetchCityWeather}
					/>
				</View>
			</BottomSheetModal>
		</>
	);
}
