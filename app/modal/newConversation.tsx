import React from "react";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import ListUsers from "@/components/ListUsers/ListUsers";

export default function ModalUsers() {
  return (
    <Box bg="background">
      <Box flexDirection="row" justifyContent="space-between" padding="m">
        <Text color="foreground" fontSize={24}>
          Nova conversa
        </Text>
      </Box>
      <ListUsers showCreateGroup />
    </Box>
  );
}
