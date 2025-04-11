import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Phone, SendHorizontal, Video } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input, InputField } from "@/components/ui/input";
import { WebSocketContext } from "@/context/webSocketContext";
import fetcher from "@/services/fetcher";
import { getUser } from "@/storage/getUser";
import useSWR from "swr";
import {
  ConversationUserTypes,
  Messages,
} from "@/@types/ConversationUserTypes";
import ErrorGeneric from "@/components/ErrorGeneric/ErrorGeneric";

export default function ChatId() {
  const { id, name } = useLocalSearchParams();

  const conversation =
    useLocalSearchParams().conversation &&
    JSON?.parse(useLocalSearchParams()?.conversation as string);

  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const roomRef = useRef(`room-${conversation?.id}`);
  const userRef = useRef(0);
  const responseRef = useRef({} as ConversationUserTypes);
  const socket = useContext(WebSocketContext);

  const { data, error, mutate, isLoading } = useSWR<ConversationUserTypes>(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation/user/${id}`,
    fetcher
  );

  async function getMessages() {
    const user = await getUser();

    userRef.current = user.id;

    setMessages(data?.messages || []);
    if (data) {
      responseRef.current = data;
    }
  }

  useEffect(() => {
    getMessages();

    return () => {
      setMessages([]);
    };
  }, [data]);

  useEffect(() => {
    socket.emit("joinRoom", roomRef.current);

    socket.on("joinedRoom", (room) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("leftRoom", (room) => {
      console.log(`Left room: ${room}`);
    });

    socket.on("onMessage", (data) => {
      setMessages((prev: any) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", roomRef.current);
      socket.off("joinedRoom");
      socket.off("leftRoom");
      socket.off("onMessage");
    };
  }, [roomRef.current]);

  async function onSubmit() {
    if (!responseRef.current.id) {
      const response = await fetcher(
        `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
        {
          method: "POST",
          body: JSON.stringify({
            isGroup: false,
            users: [userRef.current, Number(id)],
          }),
        }
      );

      responseRef.current = response;
      socket.emit("newMessage", {
        room: roomRef.current,
        content: value,
        conversationId: responseRef.current.id,
        userId: userRef.current,
        type: "text",
      });

      roomRef.current = `room-${responseRef.current.id}`;
      setValue("");
    } else {
      socket.emit("newMessage", {
        room: roomRef.current,
        content: value,
        conversationId: responseRef.current.id,
        userId: userRef.current,
        type: "text",
      });
      setValue("");
    }
  }

  if (error) {
    return <ErrorGeneric />;
  }

  return (
    <SafeAreaView className=" gap-2 flex-1 bg-white">
      <View className="flex-row justify-between  px-4 pb-4   ">
        <View className="flex-row gap-4 ">
          <ChevronLeft
            size={32}
            onPress={() => router.back()}
            color={"#0273FD"}
          />
          <Avatar size="md">
            <AvatarFallbackText>{name}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: avatar,
              }}
            />
            <AvatarBadge />
          </Avatar>
          <TouchableOpacity onPress={() => router.push("/chat/details")}>
            <Text className="text-xl font-semibold">{name}</Text>
            <Text>Online</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-6">
          <Video />
          <Phone />
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView className="bg-zinc-100 pt-2 ">
          {messages?.map((message, index) => {
            if (Number(message.userId) === userRef.current) {
              return (
                <View key={index} className="mx-2 mb-1  items-end">
                  <Text className=" p-2  rounded-md bg-primary-500 max-w-[70%] color-white font-semibold">
                    {message.content}
                  </Text>
                </View>
              );
            }

            return (
              <View key={index} className="mx-2 items-start mb-1  ">
                <Text className=" p-2  rounded-md bg-white max-w-[70%]  font-semibold">
                  {message.content}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className=" bg-white w-full "
      >
        <View className="pb-6 bg-white flex-row justify-around items-center">
          <Input className="rounded-full h-12 w-[85%]">
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
