import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

export default function ChatDetails() {
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";

  return (
    <SafeAreaView>
      <View className=" justify-center items-center">
        <Avatar size="2xl">
          <AvatarFallbackText>Usuario</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: avatar,
            }}
          />
          <AvatarBadge />
        </Avatar>
      </View>
    </SafeAreaView>
  );
}
