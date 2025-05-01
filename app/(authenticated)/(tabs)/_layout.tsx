import React from "react";
import { Tabs } from "expo-router";
import {
  MessageCircleMore,
  MessagesSquare,
  Settings,
  Tickets,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="ticketList/index"
        options={{
          tabBarIcon: ({ color }) => <Tickets color={color} size={28} />,
          tabBarLabel: "Chamados",
        }}
      />
      <Tabs.Screen
        name="chatList/index"
        options={{
          tabBarIcon: ({ color }) => (
            <MessageCircleMore color={color} size={28} />
          ),

          tabBarLabel: "Chats",
        }}
      />
      <Tabs.Screen
        name="forumList/index"
        options={{
          tabBarIcon: ({ color }) => <MessagesSquare color={color} size={28} />,

          tabBarLabel: "Fórum",
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ color }) => <Settings color={color} size={28} />,

          tabBarLabel: "Configurações",
        }}
      />
    </Tabs>
  );
}
