import React from "react";
import { Tabs } from "expo-router";
import { MessageCircleMore } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="chat/index"
        options={{
          tabBarIcon: ({ color }) => (
            <MessageCircleMore color={color} size={28} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}
