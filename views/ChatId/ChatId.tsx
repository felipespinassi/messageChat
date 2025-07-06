import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Phone, SendHorizontal, Video } from "lucide-react-native";

import { WebSocketContext } from "@/context/webSocketContext";
import fetcher from "@/services/fetcher";
import { getUser } from "@/storage/getUser";
import useSWR from "swr";
import {
  ConversationUserTypes,
  Messages,
} from "@/@types/ConversationUserTypes";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Avatar from "@/components/Avatar/Avatar";
import Input from "@/components/Input/Input";

export default function ChatId() {
  const { id, name, isGroup } = useLocalSearchParams();

  const conversation =
    useLocalSearchParams().conversation &&
    JSON?.parse(useLocalSearchParams()?.conversation as string);

  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const roomRef = useRef(`room-${conversation?.id || id}` as string);
  const chatRef = useRef(null as any);
  const userRef = useRef({} as any);
  const responseRef = useRef({} as ConversationUserTypes);
  const socket = useContext(WebSocketContext);

  const url =
    isGroup === "true"
      ? `${process.env.EXPO_PUBLIC_BASE_URL}conversation/${conversation?.id}`
      : `${process.env.EXPO_PUBLIC_BASE_URL}conversation/user/${id}`;

  const { data, isLoading } = useSWR<any>(url, fetcher);

  async function getMessages() {
    const user = await getUser();

    userRef.current = user;

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

  async function CreateConversation() {
    const response = await fetcher(
      `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
      {
        method: "POST",
        body: JSON.stringify({
          isGroup: false,
          users: [userRef.current.id, Number(id)],
        }),
      }
    );

    responseRef.current = response;
  }

  function sendMessageToWebSocket() {
    socket.emit("newMessage", {
      room: roomRef.current,
      content: value,
      conversationId: responseRef.current.id,
      userId: userRef.current.id,
      userName: userRef.current.name,
      type: "text",
    });

    roomRef.current = `room-${responseRef.current.id}`;
  }

  async function onSubmit() {
    if (!responseRef.current.id) {
      await CreateConversation();
      sendMessageToWebSocket();
      setValue("");
    } else {
      sendMessageToWebSocket();
      setValue("");
    }
  }

  // Controle da altura do teclado
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const headerHeight = 70;
  const inputHeight = 70;

  // Scroll para o fim
  const scrollToBottom = () => {
    chatRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box flex={1} backgroundColor="white">
      {/* HEADER FIXO */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="xs"
        paddingBottom="xs"
        height={headerHeight}
        alignItems="center"
        backgroundColor="white"
        zIndex={10}
      >
        <Box flexDirection="row" alignItems="center" gap="s">
          <ChevronLeft
            size={32}
            onPress={() => router.back()}
            color="#0273FD"
          />
          <Avatar
            uri={avatar}
            size={55}
            fallbackText={isGroup === "true" ? data?.name : name}
          />
          <TouchableOpacity onPress={() => router.push("/chat/details")}>
            <Text variant="header">
              {isGroup === "true" ? data?.name : name}
            </Text>
            <Text>Online</Text>
          </TouchableOpacity>
        </Box>

        <Box flexDirection="row" gap="m">
          <Video />
          <Phone />
        </Box>
      </Box>

      {/* LISTA DE MENSAGENS */}
      <FlatList
        ref={chatRef}
        style={{ flex: 1, backgroundColor: "#f4f4f5", paddingTop: 8 }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingBottom:
            Platform.OS === "android"
              ? inputHeight + keyboardHeight
              : inputHeight,
        }}
        renderItem={({ item }) => {
          const isOwnMessage = Number(item.userId) === userRef.current.id;

          return (
            <Box
              marginHorizontal="s"
              marginBottom="xs"
              alignItems={isOwnMessage ? "flex-end" : "flex-start"}
            >
              {isGroup === "true" && <Text>{item.userName}</Text>}
              <Box
                padding="s"
                borderRadius={8}
                maxWidth="70%"
                backgroundColor={isOwnMessage ? "primary" : "white"}
              >
                <Text
                  color={isOwnMessage ? "white" : "black"}
                  fontWeight="bold"
                >
                  {item.content}
                </Text>
              </Box>
            </Box>
          );
        }}
      />

      {/* INPUT + KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        enabled={Platform.OS === "ios"}
      >
        <Box
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          paddingHorizontal="s"
          height={inputHeight}
          backgroundColor="white"
          borderTopColor="gray"
          style={{
            marginBottom: Platform.OS === "android" ? keyboardHeight + 15 : 15,
          }}
        >
          <Box width="85%">
            <Input
              variant="rounded"
              size={40}
              placeholder="Digite sua mensagem"
              value={value}
              onChangeText={setValue}
              onFocus={() => {
                setTimeout(
                  () =>
                    chatRef.current?.scrollToEnd({
                      animated: true,
                    }),
                  100
                );
              }}
            />
          </Box>
          <TouchableOpacity onPress={onSubmit}>
            <Box
              backgroundColor="primary"
              height={40}
              width={40}
              borderRadius={20}
              justifyContent="center"
              alignItems="center"
            >
              <SendHorizontal size={22} color="white" />
            </Box>
          </TouchableOpacity>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
}
