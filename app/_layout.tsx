import { Stack, useRouter } from "expo-router";
import { socket, WebSocketContext } from "@/context/webSocketContext";
import { useEffect, useState } from "react";
import { getAccess_token } from "@/storage/getAccess_token";
import { ThemeProvider } from "@shopify/restyle";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/theme/theme";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAccess_token();
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else {
      router.replace("/chatList");
    }
  }, [isAuthenticated]);

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
