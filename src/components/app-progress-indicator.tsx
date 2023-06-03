import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function AppProgressIndicator() {
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
				zIndex: 1000,
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
}
