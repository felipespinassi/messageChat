import React from "react";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

export default function confirm() {
  return (
    <Box padding="s" gap="m" bg="background" flex={1}>
      <Input placeholder="Nome do grupo" />

      <Button>Criar grupo</Button>
    </Box>
  );
}
