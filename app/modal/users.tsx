import React from "react";
import ListUsers from "@/components/ListUsers/ListUsers";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

export default function users() {
  return (
    <Box flex={1} bg="background">
      <ListUsers />
    </Box>
  );
}
