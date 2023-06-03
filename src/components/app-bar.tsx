import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FIcons from "@expo/vector-icons/Fontisto";

export default function AppBar() {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				paddingHorizontal: 32,
				paddingTop: insets.top + 20,
				paddingBottom: 16,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			{/* Opens up a bottom sheet for searching city's weather */}
			<TouchableOpacity
				style={{
					width: 32,
					height: 32,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<FIcons name="search" color="white" size={26} />
			</TouchableOpacity>

			{/* Toggles theme mode */}
			<TouchableOpacity
				style={{
					width: 32,
					height: 32,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<FIcons name="night-clear" color="white" size={26} />
			</TouchableOpacity>
		</View>
	);
}
