import React from "react";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function confirm() {
  return (
    <Box margin="s" gap="m">
      <Box backgroundColor="white" padding="m" borderRadius={8}>
        <Input placeholder="Nome do grupo" />
      </Box>

      <Button>Criar grupo</Button>
    </Box>
  );
}
