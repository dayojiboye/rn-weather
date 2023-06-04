import { ImageBackground, View, Keyboard } from "react-native";
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
import useTheme from "../hooks/useTheme";
import themeConfig from "../config/theme";

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
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

	const isSubmissionAllowed: boolean = city.trim().length >= 2;

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
			__DEV__ && console.log(error);
			setCurrentState(appState.ERROR);
		}
	};

	const fetchCityWeather = async () => {
		Keyboard.dismiss();
		closeBottomsheet();
		setCurrentState(appState.LOADING);
		try {
			const response = await API.get(apiEndpoints.getCityWeather(city.trim()));
			const { status, data } = response || {};
			if (status === 200) {
				setWeather(data);
				setCurrentState(appState.SUCCESS);
			}
		} catch (error) {
			__DEV__ && console.log(error);
			setCurrentState(appState.ERROR);
		}
	};

	const openBottomsheet = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const closeBottomsheet = React.useCallback(() => {
		setCity("");
		Keyboard.dismiss();
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
					colors={[theme.background, theme.background]}
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
				handleIndicatorStyle={{ backgroundColor: theme.faded, width: 40 }}
				backdropComponent={(props) => <AppBackdrop onPress={closeBottomsheet} {...props} />}
			>
				<View style={{ paddingTop: 16, paddingHorizontal: 20, flex: 1 }}>
					<BottomSheetTextInput
						autoFocus
						placeholder="Enter City"
						placeholderTextColor={theme.placeholder}
						style={{
							fontSize: 16,
							paddingHorizontal: 16,
							paddingVertical: 20,
							backgroundColor: theme.inputBg,
							borderRadius: 50,
						}}
						onChangeText={(value) => setCity(value)}
					/>
					<AppButton
						label="Get Weather"
						disabled={!isSubmissionAllowed}
						activeOpacity={0.8}
						style={{
							marginTop: 16,
							backgroundColor: !isSubmissionAllowed ? theme.muted : theme.black,
							height: 60,
							width: "100%",
						}}
						labelStyle={{ color: !isSubmissionAllowed ? theme.disabled : theme.white }}
						onPress={fetchCityWeather}
					/>
				</View>
			</BottomSheetModal>
		</>
	);
}
