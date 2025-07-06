import React from "react";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

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
