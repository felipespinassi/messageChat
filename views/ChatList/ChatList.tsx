import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, Plus, Search, X } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useFocusEffect, useRouter } from "expo-router";
import fetcher from "@/services/fetcher";
import useSWR, { mutate } from "swr";
import { getUser } from "@/storage/getUser";
import ModalUsers from "./components/ModalUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "@/storage/storageConfig";

export default function ChatList() {
  // const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const {
    data: messages,
    error: errorMessage,
    isLoading: isLoadingMessage,
    mutate: mutateMessage,
  }: any = useSWR(`${process.env.EXPO_PUBLIC_BASE_URL}conversation`, fetcher);

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

  return (
    <SafeAreaView
      className="m-2
      "
    >
      <View className="flex-row justify-between">
        <Text className="text-3xl font-semibold">Conversas</Text>

        <View className="flex-row gap-6">
          {/* <TouchableOpacity>
            <View className="bg-white p-2 rounded-full">
              <Search color={"gray"} />
            </View>
          </TouchableOpacity> */}

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
            const lastMessage =
              item?.message?.content.slice(0, 60) || "Sem mensagens";
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
                    <AvatarImage
                      source={{
                        uri: item?.avatar,
                      }}
                    />
                    <AvatarBadge />
                  </Avatar>
                  <View className="flex flex-1 h-full justify-between ">
                    <View className="">
                      <Text className="font-bold">{item?.user?.name}</Text>
                      <Text className="text-gray-500   ">{lastMessage}</Text>
                    </View>

                    <View className="border-b  border-slate-300" />
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
