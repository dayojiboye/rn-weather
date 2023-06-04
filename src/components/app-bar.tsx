import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FIcons from "@expo/vector-icons/Fontisto";

export default function AppBar({
	disabled,
	openBottomsheet,
}: {
	disabled?: boolean;
	openBottomsheet: () => void;
}) {
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
				position: "relative",
				zIndex: 4,
			}}
		>
			<AppBarButton onPress={openBottomsheet} disabled={disabled} iconName="search" />
			{/* Toggles theme mode */}
			<AppBarButton onPress={() => {}} disabled={disabled} iconName="night-clear" />
		</View>
	);
}

const AppBarButton = ({
	disabled,
	iconName,
	onPress,
}: {
	disabled?: boolean;
	iconName: any;
	onPress: () => void;
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={{
				width: 32,
				height: 32,
				alignItems: "center",
				justifyContent: "center",
			}}
			onPress={onPress}
		>
			<FIcons name={iconName} color="white" size={26} />
		</TouchableOpacity>
	);
};
