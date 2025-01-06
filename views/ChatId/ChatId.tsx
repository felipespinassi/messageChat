import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft,
  Phone,
  Send,
  SendHorizontal,
  Video,
} from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input, InputField } from "@/components/ui/input";
import { WebSocketContext } from "@/context/webSocketContext";
import { Button, ButtonText } from "@/components/ui/button";
import useSWR from "swr";
import fetcher from "@/services/fetcher";
import { getUser } from "@/storage/getUser";

export default function ChatId() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  const [value, setValue] = useState("");
  const [response, setResponse] = useState<any>([]);

  const roomRef = useRef("room1");
  const userRef = useRef("");

  const socket = useContext(WebSocketContext);

  const { data, error, isLoading }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}users/${id}`,
    fetcher
  );

  useEffect(() => {
    socket.emit("joinRoom", roomRef.current);

    socket.on("joinedRoom", (room) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("leftRoom", (room) => {
      console.log(`Left room: ${room}`);
    });

    socket.on("onMessage", (data) => {
      setResponse((prev: any) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", roomRef.current);
      socket.off("joinedRoom");
      socket.off("leftRoom");
      socket.off("onMessage");
    };
  }, [roomRef.current]);

  async function onSubmit() {
    const user = await getUser();

    userRef.current = user.name;

    socket.emit("newMessage", {
      room: roomRef.current,
      message: value,
      sender: userRef.current,
    });
    setValue("");
  }

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <SafeAreaView className=" gap-2 flex-1 bg-white">
      <View className="flex-row justify-between  px-4 pb-4  ">
        <View className="flex-row gap-4 ">
          <ChevronLeft size={32} onPress={() => router.back()} />
          <Avatar size="md">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: avatar,
              }}
            />
            <AvatarBadge />
          </Avatar>
          <View>
            <Text className="text-xl font-semibold">{data?.name}</Text>
            <Text>Online</Text>
          </View>
        </View>

        <View className="flex-row gap-6">
          <Video />
          <Phone />
        </View>
      </View>

      <ScrollView className="bg-zinc-100">
        {response?.map((content: any, index: any) => {
          if (content.msg.sender === userRef.current) {
            return (
              <View key={index} className="mx-2  items-end">
                <Text>Você</Text>
                <Text className=" p-2  rounded-md bg-primary-500 max-w-[70%] color-white font-semibold">
                  {content.msg.message}
                </Text>
              </View>
            );
          }
          return (
            <View key={index} className="mx-2  ">
              <Text>{content.msg.sender}</Text>
              <Text className=" p-2  rounded-md bg-white w-1/2 font-semibold">
                {content.msg.message}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-0 p-2 bg-white w-full "
      >
        <View className="pb-10 bg-white flex-row justify-around items-center">
          <Input className="rounded-full w-[85%]">
            <InputField
              defaultValue={value}
              onChangeText={(e) => setValue(e)}
              placeholder="Digite sua mensagem"
            />
          </Input>
          <TouchableOpacity
            onPress={onSubmit}
            className="bg-primary-500 h-10 w-10 rounded-full justify-center items-center"
          >
            <SendHorizontal size={22} color={"white"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
