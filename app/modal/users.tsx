import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function users() {
  return (
    <TouchableOpacity onPress={() => router.push("/modal/confirm")}>
      <Text>users</Text>
    </TouchableOpacity>
  );
}
