import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useEffect } from "react";
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

export default function ChatId() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);

  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("onMessage", (data) => {
      console.log(data);
      setMessages((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off("unregistering component");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  function onSubmit() {
    socket.emit("newMessage", { message: value });
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
            <Text className="text-xl font-semibold">Felipe Augusto</Text>
            <Text>Online</Text>
          </View>
        </View>

        <View className="flex-row gap-6">
          <Video />
          <Phone />
        </View>
      </View>

      <View className="mx-2  ">
        <Text className=" p-2  rounded-md bg-white w-1/2 font-semibold">
          ola boa noite tudo bem?
        </Text>
      </View>

      {messages.map((message: any, index: any) => {
        return (
          <View className="mx-2  items-end">
            <Text className=" p-2  rounded-md bg-blue-500 max-w-[70%] color-white font-semibold">
              {message.msg.message}
            </Text>
          </View>
        );
      })}

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
