import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatId from "@/views/ChatId/ChatId";

export default function index() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";
  return <ChatId />;
}
