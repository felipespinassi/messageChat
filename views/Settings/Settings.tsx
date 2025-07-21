import React, { useEffect, useRef } from "react";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Avatar from "@/components/Avatar/Avatar";
import { TouchableOpacityBox } from "@/components/RestyleComponents/TouchableOpacity";
import { getUser } from "@/storage/getUser";
import { ActivityIndicator } from "react-native";
import { ImagePlus, Pen } from "lucide-react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme";

export default function Settings() {
  const [user, setUser] = React.useState<any>("");
  const [loading, setLoading] = React.useState(true);

  const theme = useTheme<Theme>();

  async function getUserFomStorage() {
    setLoading(true);
    const userData = await getUser();
    setUser(userData);
    setLoading(false);
  }

  useEffect(() => {
    getUserFomStorage();
  }, []);

  return (
    <Box flex={1} bg="background" gap="l" p="s">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Box alignItems="center" gap="s">
          <Avatar fallbackText={user.name} size={100} />
          <Text color="foreground" fontSize={20}>
            {user?.name || "Usuário sem nome"}
          </Text>
        </Box>
      )}

      <Box alignItems="center" bg="muted" borderRadius={6} gap="xs" padding="s">
        <TouchableOpacityBox flexDirection="row" alignItems="center" gap="s">
          <ImagePlus strokeWidth={1} color={theme.colors.primary} />
          <Text color="primary">Definir foto de perfil</Text>
        </TouchableOpacityBox>
        <Box borderColor="gray" borderBottomWidth={1} width={"100%"} />

        <TouchableOpacityBox flexDirection="row" alignItems="center" gap="s">
          <Pen color={theme.colors.primary} strokeWidth={1} />
          <Text color="primary">Definir nome de usuário</Text>
        </TouchableOpacityBox>
      </Box>
    </Box>
  );
}
