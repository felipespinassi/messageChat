import React from "react";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { router } from "expo-router";
import Button from "../ui/button";

export default function ErrorGeneric() {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap="l"
      backgroundColor="white"
    >
      <Box alignItems="center" gap="l">
        <Text fontSize={24}>Oops !</Text>
        <Text color="gray" fontSize={20}>
          Página temporariamente indisponível
        </Text>
      </Box>

      <Button onPress={() => router.replace("/")}>
        Voltar para a página inicial
      </Button>
    </Box>
  );
}
