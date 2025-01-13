import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Search, X } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useRouter } from "expo-router";
import fetcher from "@/services/fetcher";
import useSWR, { mutate } from "swr";
import { getUser } from "@/storage/getUser";
import ModalUsers from "./components/ModalUsers";

export default function ChatList() {
  // const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const userRef: any = useRef("");

  (async function getUserFromStorage() {
    try {
      userRef.current = await getUser();
    } catch (error) {
      console.log(error);
    }
  })();

  const {
    data: messages,
    error: errorMessage,
    isLoading: isLoadingMessage,
    mutate: mutateMessage,
  }: any = useSWR(`${process.env.EXPO_PUBLIC_BASE_URL}conversation`, fetcher);
  useEffect(() => {
    mutateMessage();
  }, []);

  console.log(messages);
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

  if (isLoadingMessage) {
    return <Text>Carregando...</Text>;
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
        </View>
      </View>

      <FlatList
        className="py-4 h-full"
        data={messages}
        renderItem={({ item }) => {
          const user = item.users.find(
            (user: any) => user.id !== userRef.current.id
          );

          return (
            <TouchableOpacity
              className="mb-2 px-2"
              onPress={() =>
                router.push({ pathname: "/chat/[id]", params: { id: user.id } })
              }
            >
              <View className="flex flex-row py-4 gap-4  items-center">
                <Avatar size="lg">
                  <AvatarFallbackText>{user?.name}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: item.avatar,
                    }}
                  />
                  <AvatarBadge />
                </Avatar>
                <View className="flex flex-1">
                  <Text className="font-bold">{user?.name}</Text>
                  <Text className="text-gray-500">
                    {item.messages[0]?.content || "Sem mensagens"}
                  </Text>
                </View>
                <Text className="text-gray-500">{item.time}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Nenhuma conversa </Text>
          </View>
        }
      />

      {modalVisible && (
        <ModalUsers
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
}
