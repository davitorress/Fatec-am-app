import "react-native-reanimated"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"

import QueryClientProvider from "@/providers/queryClient"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="result" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
