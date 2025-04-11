import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { LogOut, Plus, Search, X } from "lucide-react-native";

import { useFocusEffect, useRouter } from "expo-router";
import fetcher from "@/services/fetcher";
import useSWR from "swr";
import ModalUsers from "./components/ModalUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "@/storage/storageConfig";
import { ConversationTypes } from "@/@types/ConversationTypes";
import ChatListItem from "./components/ChatListItem";
import { Button, ButtonText } from "@/components/ui/button";
import ErrorGeneric from "@/components/ErrorGeneric/ErrorGeneric";

export default function ChatList() {
  // const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

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

  return (
    <SafeAreaView
      className="m-2
      "
    >
      <View className="flex-row justify-between">
        <Text className="text-3xl font-semibold">Conversas</Text>
        <View className="flex-row gap-6">
          <TouchableOpacity>
            <View className="bg-white p-2 rounded-full">
              <Search color={"gray"} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View className="bg-primary-500 p-2 rounded-full">
              <Plus color={"white"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem(ACCESS_TOKEN), router.replace("/");
            }}
          >
            <View className="bg-white p-2 rounded-full">
              <LogOut color={"#0273FD"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isLoadingMessage ? (
        <View className=" mt-8 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          className="py-4 h-full"
          data={messages}
          renderItem={({ item }) => {
            return <ChatListItem item={item} />;
          }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500">Nenhuma conversa </Text>
            </View>
          }
        />
      )}

      {modalVisible && (
        <ModalUsers
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
}
