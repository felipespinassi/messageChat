import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from "expo-audio";
import { Mic, Square } from "lucide-react-native";
import { Theme } from "@/theme/theme";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacityBox } from "../../../../components/RestyleComponents/TouchableOpacity";
import { Box } from "../../../../components/RestyleComponents/RestyleComponents";

export default function Audio({
  setIsRecording,
  isRecording,
}: {
  setIsRecording: Dispatch<SetStateAction<boolean>>;
  isRecording: boolean;
}) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const theme = useTheme<Theme>();

  const record = async () => {
    setIsRecording(true);
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    console.log("Recording to:", audioRecorder.uri);
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return (
    <TouchableOpacityBox>
      {isRecording ? (
        <TouchableOpacityBox
          bg="destructive"
          height={18}
          width={18}
          onPress={stopRecording}
          borderRadius={3}
        />
      ) : (
        <Mic color={theme.colors.primary} onPress={record} />
      )}
    </TouchableOpacityBox>
  );
}
