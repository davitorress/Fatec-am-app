import "react-native-reanimated";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<ThemeProvider value={DefaultTheme}>
			<Stack>
				<Stack.Screen name="index" />
			</Stack>
		</ThemeProvider>
	);
}

