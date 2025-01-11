import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useRouter } from "expo-router";
import * as Contacts from "expo-contacts";
import fetcher from "@/services/fetcher";
import useSWR from "swr";

export default function ChatList() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const {
    data: messages,
    error: errorMessage,
    isLoading: isLoadingMessage,
  }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation?user=5`,
    fetcher
  );

  const { data, error, isLoading }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}users`,
    fetcher
  );

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }

      if (status === "denied") {
        Alert.alert(
          "Permissão negada",
          "Você precisa permitir o acesso aos contatos"
        );
      }
    })();
  }, []);

  // if (isLoading) {
  //   return <Text>Carregando...</Text>;
  // }
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
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-2 px-2"
            onPress={() =>
              router.push({ pathname: "/chat/[id]", params: { id: item.id } })
            }
          >
            <View className="flex flex-row py-4 gap-4  items-center">
              <Avatar size="lg">
                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: item.avatar,
                  }}
                />
                <AvatarBadge />
              </Avatar>
              <View className="flex flex-1">
                <Text className="font-bold">{item.name}</Text>
                <Text className="text-gray-500">
                  {item.messages[0]?.content || "Sem mensagens"}
                </Text>
              </View>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Nenhuma conversa </Text>
          </View>
        }
      />
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-row justify-between p-4">
          <Text className="text-2xl">Nova conversa</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <X size={30} color={"gray"} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          className="bg-gray-100 mx-4 rounded-md p-2"
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => {
            return (
              <View className="flex-1 ">
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      router.push({
                        pathname: "/chat/[id]",
                        params: { id: item.id ? item.id.toString() : "" },
                      });
                  }}
                >
                  <View className="flex flex-row gap-4 items-center p-2 ">
                    <Avatar size="md">
                      <AvatarFallbackText>{item.name}</AvatarFallbackText>
                      <AvatarImage
                        source={{
                          uri: item.imageAvailable
                            ? item.image?.uri
                            : "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
                        }}
                      />
                      <AvatarBadge />
                    </Avatar>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}
