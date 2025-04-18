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
import { getUser } from "@/storage/getUser";

export default function ChatListItem({
  item,
  userRef,
}: {
  item: ConversationTypes;
  userRef: React.MutableRefObject<any>;
}) {
  const lastMessage = item?.message?.content?.slice(0, 60) || "Sem mensagens";

  const user = item?.users?.find((user) => user.id !== userRef.current.id);

  return (
    <TouchableOpacity
      className="mb-4 px-2"
      onPress={() =>
        router.push({
          pathname: "/chat/[id]",
          params: {
            id: user?.id || "",
            name: user?.name,
            conversation: JSON.stringify(item),
            isGroup: item.isGroup.toString(),
          },
        })
      }
    >
      <View className="flex flex-row h-20 gap-4   items-center">
        <Avatar size="lg">
          <AvatarFallbackText>
            {item.isGroup ? item.name : user?.name}
          </AvatarFallbackText>
          <AvatarImage />
          <AvatarBadge />
        </Avatar>
        <View className="flex flex-1 h-full justify-between ">
          <View className="">
            {item.isGroup ? (
              <Text className="font-bold">{item?.name}</Text>
            ) : (
              <Text className="font-bold">{user?.name}</Text>
            )}
            <Text className="text-gray-500   ">{lastMessage}</Text>
          </View>
          <View className="border-b  border-slate-300" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
