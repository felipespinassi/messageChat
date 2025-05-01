import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { router } from "expo-router";
import useSWR from "swr";
import fetcher from "@/services/fetcher";
import { Users, X } from "lucide-react-native";
import ListUsers from "@/components/ListUsers/ListUsers";

export default function ModalUsers() {
  return (
    <View>
      <View className="flex-row justify-between p-4">
        <Text className="text-2xl">Nova conversa</Text>
      </View>
      <ListUsers showCreateGroup />
    </View>
  );
}
