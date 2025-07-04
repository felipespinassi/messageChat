import React from "react";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import ListUsers from "@/components/ListUsers/ListUsers";

export default function ModalUsers() {
  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-between" padding="m">
        <Text fontSize={24}>Nova conversa</Text>
      </Box>
      <ListUsers showCreateGroup />
    </Box>
  );
}
