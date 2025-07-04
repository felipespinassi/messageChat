import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Button, ButtonText } from "@/components/ui/button";
import { Link, router } from "expo-router";
import { Image, SafeAreaView } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

export default function Presentation() {
  return (
    <SafeAreaView
      style={{ flex: 1, margin: 16, justifyContent: "center", gap: 256 }}
    >
      <ScreenTitle title="Bem-vindo" description="Vamos começar" />

      <Box gap="m">
        <Box gap="xs">
          <Text fontWeight="600" fontSize={20}>
            Entrar/Criar conta
          </Text>
          <Button
            onPress={() => router.replace("/login")}
            style={{
              width: "100%",
              backgroundColor: "#0273FD",
              height: 56,
              borderRadius: 12,
            }}
            size="md"
            variant="solid"
            action="default"
          >
            <ButtonText style={{ fontSize: 20 }}>Entrar</ButtonText>
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
    </SafeAreaView>
  );
}
