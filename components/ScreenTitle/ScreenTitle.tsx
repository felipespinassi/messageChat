import { View, Text } from "react-native";
import React from "react";

export default function ScreenTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="gap-1 p-2">
      <Text className="text-5xl text-primary-500 font-semibold">{title}</Text>
      <Text className="font-semibold text-xl">{description}</Text>
    </View>
  );
}
