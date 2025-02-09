import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="chat/details/index" />
    </Stack>
  );
}
