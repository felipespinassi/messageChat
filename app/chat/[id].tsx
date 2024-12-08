import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Phone, Video } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
export default function ChatId() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  return (
    <SafeAreaView className="mx-4 my-6 gap-2">
      <View className="flex-row justify-between ">
        <View className="flex-row gap-4 ">
          <ChevronLeft size={32} onPress={() => router.back()} />
          <Avatar size="md">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: avatar,
              }}
            />
            <AvatarBadge />
          </Avatar>
          <View>
            <Text className="text-xl font-semibold">Felipe Augusto</Text>
            <Text>Online</Text>
          </View>
        </View>

        <View className="flex-row gap-6">
          <Video />
          <Phone />
        </View>
      </View>

      <View>
        <Text>chat aqui </Text>
      </View>

      <View>
        <Text>barra de mensagens aqui </Text>
      </View>
    </SafeAreaView>
  );
}
