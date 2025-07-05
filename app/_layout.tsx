import { Stack } from "expo-router";
import { socket, WebSocketContext } from "@/context/webSocketContext";
import { ThemeProvider } from "@shopify/restyle";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/theme/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <WebSocketContext.Provider value={socket}>
      <ThemeProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signup/index" />
          <Stack.Screen name="login/index" />

          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </WebSocketContext.Provider>
  );
}
