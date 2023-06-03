import { View, Text, Linking, NativeModules, Platform, ScrollView } from "react-native";
import React from "react";
import AppButton from "./app-button";

const { RNAndroidOpenSettings } = NativeModules;

export default function LocationPermissionDenied({ locationErr }: { locationErr: string | null }) {
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
					color: "#fff",
					lineHeight: 32,
					fontFamily: "sfSemiBold",
					textAlign: "center",
				}}
			>
				{locationErr || "Permission to access location was denied"}
			</Text>
			<AppButton
				label="Go to Settings"
				style={{ backgroundColor: "#fff", marginTop: 32, width: 150 }}
				labelStyle={{ color: "#000" }}
				onPress={openAppSettings}
			/>
		</ScrollView>
	);
}
