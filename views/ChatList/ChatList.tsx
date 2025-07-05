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
import { Button, ButtonText } from "@/components/ui/button";
import ErrorGeneric from "@/components/ErrorGeneric/ErrorGeneric";
import { getUser } from "@/storage/getUser";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

export default function ChatList() {
  // const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const router = useRouter();
  const userRef = useRef({});

  const {
    data: messages,
    error: errorMessage,
    isLoading: isLoadingMessage,
    mutate: mutateMessage,
  } = useSWR<ConversationTypes[]>(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
    fetcher
  );

  useFocusEffect(
    useCallback(() => {
      mutateMessage();
    }, [mutateMessage])
  );

  async function getUserFomStorage() {
    userRef.current = await getUser();
  }

  useEffect(() => {
    getUserFomStorage();
  }, []);

  //pegar contatos
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === "granted") {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.Emails],
  //       });

  //       if (data.length > 0) {
  //         setContacts(data);
  //       }
  //     }

  //     if (status === "denied") {
  //       Alert.alert(
  //         "Permissão negada",
  //         "Você precisa permitir o acesso aos contatos"
  //       );
  //     }
  //   })();
  // }, []);

  if (errorMessage) {
    return <ErrorGeneric />;
  }

  function compare(a: ConversationTypes, b: ConversationTypes) {
    if (a.message.createdAt < b.message.createdAt) {
      return 1;
    }
    if (a.message.createdAt > b.message.createdAt) {
      return -1;
    }
    return 0;
  }

  return (
    <Box flex={1} marginHorizontal="s" marginTop="s">
      <Box flexDirection="row" justifyContent="space-between">
        <Text variant="header" fontSize={24} fontWeight="600">
          Conversas
        </Text>
        <Box flexDirection="row" gap="m">
          <TouchableOpacity>
            <Box backgroundColor="white" padding="s" borderRadius={20}>
              <Search color={"gray"} />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/modal/newConversation")}
          >
            <Box backgroundColor="primary" padding="s" borderRadius={20}>
              <Plus color={"white"} />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem(ACCESS_TOKEN), router.replace("/");
            }}
          >
            <Box backgroundColor="white" padding="s" borderRadius={20}>
              <LogOut color={"#0273FD"} />
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
