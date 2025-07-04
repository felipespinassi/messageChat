import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

export default function ArrowBack() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Box margin="s" flexDirection="row" gap="xs" alignItems="center">
        <ChevronLeft color={"#3B82F6"} />
        <Text fontWeight="600">Voltar</Text>
      </Box>
    </TouchableOpacity>
  );
}
