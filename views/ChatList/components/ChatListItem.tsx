import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { ConversationTypes } from "@/@types/ConversationTypes";

export default function ChatListItem({ item }: { item: ConversationTypes }) {
  const lastMessage = item?.message?.content?.slice(0, 60) || "Sem mensagens";
  return (
    <TouchableOpacity
      className="mb-2 px-2"
      onPress={() =>
        router.push({
          pathname: "/chat/[id]",
          params: {
            id: item.user.id,
            name: item.user.name,
            conversation: JSON.stringify(item),
          },
        })
      }
    >
      <View className="flex flex-row h-20 gap-4   items-center">
        <Avatar size="lg">
          <AvatarFallbackText>{item?.user?.name}</AvatarFallbackText>
          <AvatarImage />
          <AvatarBadge />
        </Avatar>
        <View className="flex flex-1 h-full justify-between ">
          <View className="">
            <Text className="font-bold">{item?.user?.name}</Text>
            <Text className="text-gray-500   ">{lastMessage}</Text>
          </View>
          <View className="border-b  border-slate-300" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
