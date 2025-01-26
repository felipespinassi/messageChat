import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../styles/global.css";
import { socket, WebSocketContext } from "@/context/webSocketContext";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <WebSocketContext.Provider value={socket}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signup/index" />
          <Stack.Screen name="login/index" />
        </Stack>
      </WebSocketContext.Provider>
    </GluestackUIProvider>
  );
}
