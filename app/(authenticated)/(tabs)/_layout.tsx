import React from "react";
import { Tabs } from "expo-router";
import {
  MessageCircleMore,
  MessagesSquare,
  Settings,
  Tickets,
} from "lucide-react-native";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme";

export default function TabLayout() {
  const theme = useTheme<Theme>();
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            Platform.OS === "ios" ? "transparent" : theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            tint={
              colorScheme === "dark"
                ? "dark"
                : colorScheme === "light"
                ? "light"
                : "default"
            } // ou "dark"
            intensity={50}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="ticketList/index"
        options={{
          tabBarIcon: ({ color }) => <Tickets color={color} size={28} />,
          tabBarLabel: "Chamados",
          tabBarActiveTintColor: theme.colors.primary,
        }}
      />
      <Tabs.Screen
        name="chatList/index"
        options={{
          tabBarIcon: ({ color }) => (
            <MessageCircleMore color={color} size={28} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabel: "Chats",
        }}
      />
      <Tabs.Screen
        name="forumList/index"
        options={{
          tabBarIcon: ({ color }) => <MessagesSquare color={color} size={28} />,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabel: "Fórum",
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ color }) => <Settings color={color} size={28} />,
          tabBarActiveTintColor: theme.colors.primary,

          tabBarLabel: "Configurações",
        }}
      />
    </Tabs>
  );
}
