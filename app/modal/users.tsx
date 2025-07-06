import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import ListUsers from "@/components/ListUsers/ListUsers";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Button from "@/components/Button/Button";

export default function users() {
  return (
    <Box flex={1} bg="background">
      <Button
        style={{ padding: 16 }}
        size={40}
        onPress={() => router.push("/modal/confirm")}
      >
        Confirmar
      </Button>
      <ListUsers />
    </Box>
  );
}
