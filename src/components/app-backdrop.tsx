import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedProps,
	useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function AppBackdrop({
	animatedIndex,
	style,
	onPress,
}: BottomSheetBackdropProps & {
	onPress?: () => void;
}) {
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: `rgba(0,0,0,${interpolate(
			animatedIndex.value,
			[-1, 0],
			[0, 0.5],
			Extrapolate.CLAMP
		)})`,
	}));

	const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style]);

	const blurViewProps = useAnimatedProps(() => {
		return {
			intensity: interpolate(animatedIndex.value, [-1, 0], [0, 20], Extrapolate.CLAMP),
		};
	});

	return (
		<Pressable
			style={{
				flex: 1,
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
			onPress={() => onPress?.()}
		>
			<AnimatedBlurView animatedProps={blurViewProps} style={containerStyle} />
		</Pressable>
	);
}
