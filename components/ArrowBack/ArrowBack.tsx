import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function ArrowBack() {
  return (
    <TouchableOpacity onPress={() => router.back()} className="m-2">
      <View className="flex-row gap-1 items-center">
        <ChevronLeft color={"blue"} />
        <Text className="font-semibold">Voltar</Text>
      </View>
    </TouchableOpacity>
  );
}
