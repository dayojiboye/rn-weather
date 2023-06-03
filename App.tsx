import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";

SplashScreen.preventAutoHideAsync();

import Home from "./src/screens/home";

export default function App() {
	const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
	const [isLoadingLocation, setIsLoadingLocation] = React.useState<boolean>(true);

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

	React.useEffect(() => {
		_requestPermission();
	}, []);

	const [fontsLoaded] = useFonts({
		sfLight: require("./assets/fonts/SF-Pro-Display-Light.otf"),
		sf: require("./assets/fonts/SF-Pro-Display-Regular.otf"),
		sfMedium: require("./assets/fonts/SF-Pro-Display-Medium.otf"),
		sfSemiBold: require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
		sfBold: require("./assets/fonts/SF-Pro-Display-Bold.otf"),
	});

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
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
