import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";
import { useTheme } from "@shopify/restyle";

export default function ArrowBack() {
  const theme = useTheme<Theme>();
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Box margin="s" flexDirection="row" gap="xs" alignItems="center">
        <ChevronLeft color={theme.colors.primary} />
        <Text color="foreground" fontWeight="600">
          Voltar
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
