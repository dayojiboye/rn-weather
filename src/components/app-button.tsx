import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
	TextStyle,
} from "react-native";
import React from "react";

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
	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			disabled={disabled}
			style={[
				{
					backgroundColor: "#000",
					borderRadius: 8,
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
			<Text style={[{ fontSize: 18, color: "#fff", fontFamily: "sfMedium" }, labelStyle]}>
				{label}
			</Text>
		</TouchableOpacity>
	);
}
