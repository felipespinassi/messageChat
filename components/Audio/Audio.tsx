import { useState, useEffect } from "react";
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
import { TouchableOpacityBox } from "../RestyleComponents/TouchableOpacity";

export default function Audio() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const theme = useTheme<Theme>();

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    console.log("Recording to:", audioRecorder.uri);
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
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
      {recorderState.isRecording ? (
        <Square color={"red"} onPress={stopRecording} />
      ) : (
        <Mic color={theme.colors.primary} onPress={record} />
      )}
    </TouchableOpacityBox>
  );
}
