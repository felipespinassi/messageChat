import React, { useEffect, useRef } from "react";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Avatar from "@/components/Avatar/Avatar";
import { TouchableOpacityBox } from "@/components/RestyleComponents/TouchableOpacity";
import { getUser } from "@/storage/getUser";
import { ActivityIndicator } from "react-native";
import { ArrowRight, ImagePlus, Pen } from "lucide-react-native";
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

  const items = [
    { label: "Definir foto de perfil", icon: ImagePlus },
    { label: "Definir nome de usuário", icon: Pen },
  ];

  return (
    <Box flex={1} bg="background" gap="l" p="l">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Box gap="m" flexDirection="row" alignItems="center">
          <Avatar fallbackText={user.name} size={80} />
          <Box>
            <Text color="foreground" fontWeight={"semibold"} fontSize={20}>
              {user?.name || "Usuário sem nome"}
            </Text>
            <Text color="gray">Gerente</Text>
          </Box>
        </Box>
      )}

      <Box borderRadius={6} gap="xs">
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="s"
        >
          <Box flexDirection="row" alignItems="center" gap="s">
            <ImagePlus
              size={30}
              strokeWidth={1}
              color={theme.colors.secondary}
            />
            <Text color="primary">Definir foto de perfil</Text>
          </Box>

          <ArrowRight size={18} color={theme.colors.primary} />
        </TouchableOpacityBox>
      </Box>
    </Box>
  );
}
