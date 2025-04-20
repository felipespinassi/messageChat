import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="newConversation"
        options={{ title: "Nova conversa" }}
      />
      <Stack.Screen name="users" options={{ title: "Selecionar Usuários" }} />
    </Stack>
  );
}
