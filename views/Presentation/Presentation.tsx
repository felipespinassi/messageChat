import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Button from "@/components/Button/Button";

export default function Presentation() {
  return (
    <Box
      flex={1}
      marginHorizontal="l"
      justifyContent="center"
      style={{ gap: 250 }}
    >
      <ScreenTitle title="Bem-vindo" description="Vamos começar" />

      <Box gap="m">
        <Box gap="xs">
          <Text fontWeight="600" fontSize={20}>
            Entrar/Criar conta
          </Text>
          <Button
            onPress={() => router.replace("/login")}
            size={40}
            variant="solid"
            action="primary"
          >
            Entrar
          </Button>
        </Box>

        <Box flexDirection="row" gap="xs" alignItems="center">
          <Text fontWeight="600" fontSize={20}>
            Novo usuario?
          </Text>
          <Link href="/signup" style={{ color: "#0273FD", fontSize: 20 }}>
            Criar conta
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
