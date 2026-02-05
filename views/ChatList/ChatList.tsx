import { TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, Plus, Search, X } from "lucide-react-native";

import { useFocusEffect, useRouter } from "expo-router";
import fetcher from "@/services/fetcher";
import useSWR from "swr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "@/storage/storageConfig";
import { ConversationTypes } from "@/@types/ConversationTypes";
import ChatListItem from "./components/ChatListItem";
import ErrorGeneric from "@/components/ErrorGeneric/ErrorGeneric";
import { getUser } from "@/storage/getUser";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { compare } from "./utils/sortMessages";

export default function ChatList() {
  const router = useRouter();
  const userRef = useRef({});

  const {
    data: messages,
    error: errorMessage,
    isLoading: isLoadingMessage,
    mutate: mutateMessage,
  } = useSWR<ConversationTypes[]>(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
    fetcher,
  );

  useFocusEffect(
    useCallback(() => {
      mutateMessage();
    }, [mutateMessage]),
  );

  async function getUserFomStorage() {
    userRef.current = await getUser();
  }

  useEffect(() => {
    getUserFomStorage();
  }, []);

  // if (errorMessage) {
  //   return <ErrorGeneric />;
  // }

  const theme = useTheme<Theme>();

  return (
    <Box flex={1} paddingHorizontal="s" paddingTop="s" bg="background">
      <Box flexDirection="row" justifyContent="space-between">
        <Text
          color="foreground"
          variant="header"
          fontSize={24}
          fontWeight="600"
        >
          Conversas
        </Text>
        <Box flexDirection="row" gap="m">
          <TouchableOpacity>
            <Box backgroundColor="muted" padding="s" borderRadius={20}>
              <Search color={"gray"} />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/modal/newConversation")}
          >
            <Box backgroundColor="primary" padding="s" borderRadius={20}>
              <Plus color={theme.colors.white} />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              (AsyncStorage.removeItem(ACCESS_TOKEN), router.replace("/"));
            }}
          >
            <Box backgroundColor="muted" padding="s" borderRadius={20}>
              <LogOut color={theme.colors.foreground} />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

      {isLoadingMessage ? (
        <Box marginTop="l" alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" />
        </Box>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 16, height: "100%" }}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={messages?.sort(compare)}
          renderItem={({ item }) => {
            return <ChatListItem item={item} userRef={userRef} />;
          }}
          ListEmptyComponent={
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text color="gray">Nenhuma conversa </Text>
            </Box>
          }
        />
      )}
    </Box>
  );
}
