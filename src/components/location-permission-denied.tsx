import { View, Text, Linking, NativeModules, Platform, ScrollView } from "react-native";
import React from "react";
import AppButton from "./app-button";
import useTheme from "../hooks/useTheme";
import themeConfig from "../config/theme";

const { RNAndroidOpenSettings } = NativeModules;

export default function LocationPermissionDenied({ locationErr }: { locationErr: string | null }) {
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

	const openAppSettings = () => {
		if (Platform.OS === "ios") {
			Linking.openURL("app-settings:");
		} else {
			RNAndroidOpenSettings.appDetailsSettings();
		}
	};

	return (
		<ScrollView
			style={{
				position: "absolute",
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: 3,
				flex: 1,
			}}
			contentContainerStyle={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text
				style={{
					fontSize: 18,
					color: theme.white,
					lineHeight: 32,
					fontFamily: "sfSemiBold",
					textAlign: "center",
				}}
			>
				{locationErr || "Permission to access location was denied"}
			</Text>
			<AppButton
				label="Go to Settings"
				style={{ backgroundColor: theme.primary, marginTop: 32, width: 150 }}
				labelStyle={{ color: theme.secondary }}
				onPress={openAppSettings}
			/>
		</ScrollView>
	);
}
