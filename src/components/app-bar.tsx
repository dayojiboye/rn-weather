import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FIcons from "@expo/vector-icons/Fontisto";
import useTheme from "../hooks/useTheme";
import { themeMode } from "../enums";
import themeConfig from "../config/theme";

export default function AppBar({
	disabled,
	openBottomsheet,
}: {
	disabled?: boolean;
	openBottomsheet: () => void;
}) {
	const insets = useSafeAreaInsets();
	const appTheme = useTheme();

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
			<AppBarButton
				onPress={() => {
					appTheme.toggleTheme(
						appTheme.theme === themeMode.DARK ? themeMode.LIGHT : themeMode.DARK
					);
				}}
				disabled={disabled}
				iconName={appTheme.theme === themeMode.DARK ? "day-sunny" : "night-clear"}
				size={appTheme.theme === themeMode.DARK ? 32 : 28}
			/>
		</View>
	);
}

const AppBarButton = ({
	disabled,
	iconName,
	size = 26,
	onPress,
}: {
	disabled?: boolean;
	iconName: any;
	size?: number;
	onPress: () => void;
}) => {
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

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
			<FIcons name={iconName} color={theme.white} size={size} />
		</TouchableOpacity>
	);
};
