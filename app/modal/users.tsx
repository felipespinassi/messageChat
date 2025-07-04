import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import ListUsers from "@/components/ListUsers/ListUsers";

export default function users() {
  return (
    <>
      <TouchableOpacity
        style={{ padding: 16 }}
        onPress={() => router.push("/modal/confirm")}
      ></TouchableOpacity>
      <ListUsers />
    </>
  );
}
