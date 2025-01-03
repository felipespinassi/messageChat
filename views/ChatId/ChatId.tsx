import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Phone, Video } from "lucide-react-native";
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

export default function ChatId() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  const [value, setValue] = useState("");
  const [response, setResponse] = useState<any>([]);
  const [room, setRoom] = useState("room1");
  const socket = useContext(WebSocketContext);

  const { data, error, isLoading }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}users/${id}`,
    fetcher
  );

  console.log(data);

  useEffect(() => {
    socket.emit("joinRoom", room);

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
      socket.emit("leaveRoom", room);
      socket.off("joinedRoom");
      socket.off("leftRoom");
      socket.off("onMessage");
    };
  }, [room]);

  function onSubmit() {
    socket.emit("newMessage", { room, message: value, sender: "Felipe" });
    setValue("");
  }

  return (
    <SafeAreaView className=" gap-2 flex-1">
      <View className="flex-row justify-between  px-4 pb-4 bg-white">
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

      {response?.map((content: any, index: any) => {
        console.log(content);
        if (content.msg.sender === "Pessoa 2") {
          return (
            <View key={index} className="mx-2  ">
              <Text>{content.msg.sender}</Text>
              <Text className=" p-2  rounded-md bg-white w-1/2 font-semibold">
                {content.msg.message}
              </Text>
            </View>
          );
        }
        return (
          <View key={index} className="mx-2  items-end">
            <Text>Você</Text>
            <Text className=" p-2  rounded-md bg-primary-500 max-w-[70%] color-white font-semibold">
              {content.msg.message}
            </Text>
          </View>
        );
      })}
      {/* {response ? <Text>Response: {response}</Text> : null} */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-0 p-2 bg-white w-full "
      >
        <View className="pb-10 pt-2 bg-white">
          <Input className="rounded-full">
            <InputField
              defaultValue={value}
              onChangeText={(e) => setValue(e)}
              placeholder="Digite sua mensagem"
            />
          </Input>

          <Button onPress={onSubmit}>
            <ButtonText>Enviar</ButtonText>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
