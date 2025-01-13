import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
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

export default function ChatId() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  const [value, setValue] = useState("");

  const [messages, setMessages] = useState<any>([]);

  const roomRef = useRef("room1");
  const userChatRef: any = useRef("");
  const userRef = useRef("");
  const conversationIdRef = useRef("");
  const responseRef: any = useRef("");
  const socket = useContext(WebSocketContext);

  async function getMessages() {
    const user = await getUser();

    userRef.current = user.id;
    const response = await fetcher(
      `${process.env.EXPO_PUBLIC_BASE_URL}conversation?user=${id}`
    );

    const responseMessages = {
      conversation_id: response[0].id,
      user_id: response[0].users.find((users: any) => users.id !== user.id),
      messages: response[0].messages,
    };

    conversationIdRef.current = responseMessages.conversation_id;

    setMessages(responseMessages.messages);

    userChatRef.current = responseMessages.user_id;

    responseRef.current.newConversation.id = response[0].id;
  }

  useEffect(() => {
    getMessages();
  }, []);

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
    const user = await getUser();

    userRef.current = user.id;

    if (messages.length === 0) {
      const response = await fetcher(
        `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
        {
          method: "POST",
          body: JSON.stringify({
            is_group: false,
            user_id: [user.id, Number(id)],
          }),
        }
      );

      responseRef.current = response;
      socket.emit("newMessage", {
        room: roomRef.current,
        content: value,
        conversation_id: responseRef.current.newConversation.id,
        user_id: userRef.current,
        type: "text",
      });
      setValue("");
    } else {
      socket.emit("newMessage", {
        room: roomRef.current,
        content: value,
        conversation_id: conversationIdRef.current,
        user_id: userRef.current,
        type: "text",
      });
      setValue("");
    }
  }

  return (
    <SafeAreaView className=" gap-2 flex-1 bg-white">
      <View className="flex-row justify-between  px-4 pb-4  ">
        <View className="flex-row gap-4 ">
          <ChevronLeft size={32} onPress={() => router.back()} />
          <Avatar size="md">
            <AvatarFallbackText>{userChatRef.current.name}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: avatar,
              }}
            />
            <AvatarBadge />
          </Avatar>
          <View>
            <Text className="text-xl font-semibold">
              {userChatRef.current.name}
            </Text>
            <Text>Online</Text>
          </View>
        </View>

        <View className="flex-row gap-6">
          <Video />
          <Phone />
        </View>
      </View>

      <ScrollView className="bg-zinc-100 ">
        {messages?.map((message: any, index: any) => {
          if (message.user_id === userRef.current) {
            return (
              <View key={index} className="mx-2  items-end">
                <Text>Você</Text>
                <Text className=" p-2  rounded-md bg-primary-500 max-w-[70%] color-white font-semibold">
                  {message.content}
                </Text>
              </View>
            );
          }
          return (
            <View key={index} className="mx-2  ">
              <Text>{message?.sender}</Text>
              <Text className=" p-2  rounded-md bg-white w-1/2 font-semibold">
                {message.content}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className=" bg-white w-full "
      >
        <View className="pb-2 bg-white flex-row justify-around items-center">
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
