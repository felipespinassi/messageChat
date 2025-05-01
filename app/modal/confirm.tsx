import { View, Text } from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

export default function confirm() {
  return (
    <View className="m-3 gap-4">
      <View className="bg-white p-5 rounded-lg">
        <Input className="border-0">
          <InputField placeholder="Nome do grupo" />
        </Input>
      </View>

      <Button>
        <ButtonText>Criar grupo</ButtonText>
      </Button>
    </View>
  );
}
