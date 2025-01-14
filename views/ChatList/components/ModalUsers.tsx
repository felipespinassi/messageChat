import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { router } from "expo-router";
import useSWR from "swr";
import fetcher from "@/services/fetcher";
import { X } from "lucide-react-native";

export default function ModalUsers({ modalVisible, setModalVisible }: any) {
  const { data, error, isLoading }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}users`,
    fetcher
  );

  return (
    <View>
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
                        params: {
                          id: item.id ? item.id.toString() : "",
                          name: item.name,
                        },
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
    </View>
  );
}
