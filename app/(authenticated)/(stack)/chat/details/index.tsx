import { SafeAreaView } from "react-native";
import React from "react";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import Avatar from "@/components/Avatar/Avatar";

export default function ChatDetails() {
  const avatar = "https://cdn-icons-png.flaticon.com/512/6858/6858504.png";

  return (
    <SafeAreaView>
      <Box justifyContent="center" alignItems="center">
        <Avatar uri={avatar} fallbackText={"Usuário"} size={120} />
      </Box>
    </SafeAreaView>
  );
}
