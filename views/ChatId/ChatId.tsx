import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Camera,
  ChevronLeft,
  Phone,
  Play,
  SendHorizontal,
  Video,
} from "lucide-react-native";

import { WebSocketContext } from "@/context/webSocketContext";
import {
  ConversationUserTypes,
  Messages,
} from "@/@types/ConversationUserTypes";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Avatar from "@/components/Avatar/Avatar";
import Input from "@/components/Input/Input";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { CreateConversation } from "./utils/createConversation";
import { useGetConversation } from "@/hooks/conversation/UseGetConversation";
import { getMessages } from "./utils/getMessages";
import { UserContext } from "@/context/userContext";
import ChatIdBottom from "./components/ChatIdBottom/ChatIdBottom";
import { TouchableOpacityBox } from "@/components/RestyleComponents/TouchableOpacity";

export default function ChatId() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const conversation =
    useLocalSearchParams().conversation &&
    JSON?.parse(useLocalSearchParams()?.conversation as string);

  const { id, name, isGroup } = useLocalSearchParams();
  const { data, isLoading } = useGetConversation(conversation, isGroup, id);

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const theme = useTheme<Theme>();

  const roomRef = useRef(`room-${conversation?.id || id}` as string);
  const chatRef = useRef(null as FlatList | null);
  const responseRef = useRef({} as ConversationUserTypes);
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    getMessages(data, setMessages, responseRef);
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

  function sendMessageToWebSocket() {
    socket.emit("newMessage", {
      room: roomRef.current,
      content: value,
      conversationId: responseRef.current.id,
      userId: user.id,
      userName: user.name,
      type: "text",
    });

    roomRef.current = `room-${responseRef.current.id}`;
  }

  async function onSubmit() {
    if (!responseRef.current.id) {
      await CreateConversation(user, id as string, responseRef);
      sendMessageToWebSocket();
      setValue("");
    } else {
      sendMessageToWebSocket();
      setValue("");
    }
  }

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

  const scrollToBottom = () => {
    chatRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box flex={1} backgroundColor="background">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="xs"
        paddingBottom="xs"
        height={headerHeight}
        alignItems="center"
        backgroundColor="background"
        zIndex={10}
      >
        <Box flexDirection="row" alignItems="center" gap="s">
          <ChevronLeft
            size={32}
            onPress={() => router.back()}
            color={theme.colors.primary}
          />
          <Avatar
            size={55}
            fallbackText={isGroup === "true" ? data?.name : name}
          />
          <TouchableOpacity onPress={() => router.push("/chat/details")}>
            <Text color="foreground" variant="header">
              {isGroup === "true" ? data?.name : name}
            </Text>
            <Text color="success">Online</Text>
          </TouchableOpacity>
        </Box>

        <Box flexDirection="row" gap="m">
          <Video color={theme.colors.primary} />
          <Phone color={theme.colors.primary} />
        </Box>
      </Box>

      {isLoading ? (
        <Box flex={1} justifyContent="center">
          <ActivityIndicator size={"large"} />
        </Box>
      ) : (
        <FlatList
          ref={chatRef}
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          data={[...messages].reverse()}
          inverted
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
            const isOwnMessage = Number(item.userId) === user.id;

            return (
              <Box
                marginHorizontal="s"
                marginBottom="xs"
                alignItems={isOwnMessage ? "flex-end" : "flex-start"}
              >
                <Box
                  padding="s"
                  borderRadius={8}
                  maxWidth="70%"
                  backgroundColor={isOwnMessage ? "primary" : "muted"}
                  borderBottomRightRadius={isOwnMessage ? 2 : 8}
                  borderBottomLeftRadius={isOwnMessage ? 8 : 2}
                >
                  {isGroup === "true" && isOwnMessage === false && (
                    <Text color={"secondary"}>{item.userName}</Text>
                  )}

                  {item.type === "audio" ? (
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      width={200}
                    >
                      <TouchableOpacityBox>
                        <Play color={"white"} />
                      </TouchableOpacityBox>
                      <Avatar
                        uri="https://avatars.githubusercontent.com/u/77703754?v=4"
                        size={40}
                        fallbackText={isGroup === "true" ? data?.name : name}
                      />
                    </Box>
                  ) : (
                    <Text
                      color={isOwnMessage ? "white" : "foreground"}
                      fontWeight="condensed"
                    >
                      {item.content}
                    </Text>
                  )}
                </Box>
              </Box>
            );
          }}
        />
      )}

      <ChatIdBottom
        inputHeight={inputHeight}
        keyboardHeight={keyboardHeight}
        value={value}
        setValue={setValue}
        onSubmit={onSubmit}
      />
    </Box>
  );
}
