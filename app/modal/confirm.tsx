import React from "react";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

export default function confirm() {
  return (
    <Box margin="s" gap="m">
      <Box backgroundColor="white" padding="m" borderRadius={8}>
        <Input style={{ borderWidth: 0 }}>
          <InputField placeholder="Nome do grupo" />
        </Input>
      </Box>

      <Button>
        <ButtonText>Criar grupo</ButtonText>
      </Button>
    </Box>
  );
}
