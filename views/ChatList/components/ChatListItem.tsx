import { TouchableOpacity } from "react-native";
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
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

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
      style={{ marginBottom: 16, paddingHorizontal: 8 }}
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
      <Box flexDirection="row" height={80} gap="s" alignItems="center">
        <Avatar size="lg">
          <AvatarFallbackText>
            {item.isGroup ? item.name : user?.name}
          </AvatarFallbackText>
          <AvatarImage />
          <AvatarBadge />
        </Avatar>
        <Box flex={1} height="100%" justifyContent="space-between">
          <Box>
            {item.isGroup ? (
              <Text fontWeight="bold">{item?.name}</Text>
            ) : (
              <Text fontWeight="bold">{user?.name}</Text>
            )}
            <Text color="gray">{lastMessage}</Text>
          </Box>
          <Box borderBottomWidth={1} borderColor="border" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
