import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import Home from "./src/screens/home";

export default function App() {
	const [fontsLoaded] = useFonts({
		sfLight: require("./src/assets/fonts/SF-Pro-Display-Light.otf"),
		sf: require("./src/assets/fonts/SF-Pro-Display-Regular.otf"),
		sfMedium: require("./src/assets/fonts/SF-Pro-Display-Medium.otf"),
		sfSemiBold: require("./src/assets/fonts/SF-Pro-Display-Semibold.otf"),
		sfBold: require("./src/assets/fonts/SF-Pro-Display-Bold.otf"),
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
			<Home />
		</SafeAreaProvider>
	);
}
