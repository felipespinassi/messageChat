import { Stack, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../styles/global.css";
import { socket, WebSocketContext } from "@/context/webSocketContext";
import { useEffect, useState } from "react";
import { getAccess_token } from "@/storage/getAccess_token";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

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
    <GluestackUIProvider mode="light">
      <WebSocketContext.Provider value={socket}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signup/index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </WebSocketContext.Provider>
    </GluestackUIProvider>
  );
}
