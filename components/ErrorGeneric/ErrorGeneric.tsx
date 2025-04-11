import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonText } from "../ui/button";
import { router } from "expo-router";

export default function ErrorGeneric() {
  return (
    <View className="flex-1 justify-center items-center gap-10 bg-white">
      <View className="items-center gap-10">
        <Text className="text-3xl">Oops !</Text>
        <Text className="text-gray-500 text-xl">
          Página temporariamente indisponível
        </Text>
      </View>

      <Button onPress={() => router.replace("/")}>
        <ButtonText>Voltar para a página inicial</ButtonText>
      </Button>
    </View>
  );
}
