import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import Input from "@/components/Input/Input";
import { Camera, SendHorizontal } from "lucide-react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import Audio from "@/views/ChatId/components/Audio/Audio";

export default function ChatIdBottom({
  inputHeight,
  // keyboardHeight,
  value,
  setValue,
  onSubmit,
}: {
  inputHeight: number;
  keyboardHeight: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const theme = useTheme<Theme>();

  return (
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
        backgroundColor="background"
        borderTopColor="gray"
        // style={{
        //   marginBottom: Platform.OS === "android" ? keyboardHeight + 15 : 15,
        // }}
      >
        <Box width="80%">
          {isRecording ? (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap="s"
            >
              <Box borderRadius={50} height={15} width={15} bg="destructive" />
              <Text>Gravando</Text>
            </Box>
          ) : (
            <Input
              variant="rounded"
              size={40}
              placeholder="Digite sua mensagem"
              value={value}
              onChangeText={setValue}
            />
          )}
        </Box>

        {value.length > 0 ? (
          <TouchableOpacity onPress={onSubmit}>
            <Box
              backgroundColor="primary"
              height={40}
              width={40}
              borderRadius={20}
              justifyContent="center"
              alignItems="center"
            >
              <SendHorizontal size={22} color={theme.colors.white} />
            </Box>
          </TouchableOpacity>
        ) : (
          <Box flexDirection="row" gap="s" alignItems="center">
            <Camera color={theme.colors.primary} />
            <Audio setIsRecording={setIsRecording} isRecording={isRecording} />
          </Box>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
}
