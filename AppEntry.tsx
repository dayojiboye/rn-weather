import React from "react";
// import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";

SplashScreen.preventAutoHideAsync();

import Home from "./src/screens/home";
import useTheme from "./src/hooks/useTheme";
// import { themeMode } from "./src/enums";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppEntry() {
	const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
	const [isLoadingLocation, setIsLoadingLocation] = React.useState<boolean>(true);
	const appTheme = useTheme();

	// const colorScheme = useColorScheme();

	const _requestPermission = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		__DEV__ && console.log(status);
		if (status !== "granted") {
			setErrorMsg(
				`Permission to access location was denied.\nGrant rn-weather permission to get current weather of your city.
				\nOr you could search for a city.`
			);
			setIsLoadingLocation(false);
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		setIsLoadingLocation(false);
	};

	const _getUserPreferredTheme = async () => {
		try {
			const value = await AsyncStorage.getItem("theme");
			if (value !== null) {
				appTheme.toggleTheme(value);
			}
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading user's theme", err);
		}
	};

	React.useEffect(() => {
		_requestPermission();
	}, []);

	// React.useEffect(() => {
	// 	appTheme.toggleTheme(colorScheme === "dark" ? themeMode.DARK : themeMode.LIGHT);
	// }, [colorScheme]);

	const [fontsLoaded] = useFonts({
		sfLight: require("./assets/fonts/SF-Pro-Display-Light.otf"),
		sf: require("./assets/fonts/SF-Pro-Display-Regular.otf"),
		sfMedium: require("./assets/fonts/SF-Pro-Display-Medium.otf"),
		sfSemiBold: require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
		sfBold: require("./assets/fonts/SF-Pro-Display-Bold.otf"),
	});

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			_getUserPreferredTheme();
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<BottomSheetModalProvider>
				<Home location={location} locationErr={errorMsg} isLocationLoading={isLoadingLocation} />
			</BottomSheetModalProvider>
		</SafeAreaProvider>
	);
}
