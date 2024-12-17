import { Stack } from "expo-router";
import "@/styles\\global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../styles/global.css";
export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen name="signup/index" />
      </Stack>
    </GluestackUIProvider>
  );
}
