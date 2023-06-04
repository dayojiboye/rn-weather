import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
	TextStyle,
} from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";
import themeConfig from "../config/theme";

type Props = {
	disabled?: boolean;
	label: string;
	style?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	activeOpacity?: number;
	onPress?: (event: GestureResponderEvent) => void;
};

export default function AppButton({
	disabled,
	label = "Button",
	style,
	labelStyle,
	activeOpacity,
	onPress,
	...props
}: Props) {
	const appTheme = useTheme();
	const theme = themeConfig(appTheme.theme);

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			disabled={disabled}
			style={[
				{
					backgroundColor: theme.secondary,
					borderRadius: 50,
					width: 200,
					height: 50,
					alignItems: "center",
					justifyContent: "center",
				},
				style,
			]}
			onPress={onPress}
			{...props}
		>
			<Text style={[{ fontSize: 18, color: theme.primary, fontFamily: "sfMedium" }, labelStyle]}>
				{label}
			</Text>
		</TouchableOpacity>
	);
}
