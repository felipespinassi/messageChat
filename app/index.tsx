import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex flex-1 m-4 ">
      <View className="gap-5 mt-4">
        <Text className="text-5xl font-bold">
          Deixe sua comunicação mais incrível com
        </Text>

        <Button className=" w-52 bg-blue-500 h-16 rounded-3xl " variant="solid">
          <ButtonText className="text-xl ">Message Chat</ButtonText>
        </Button>
      </View>

      <Link href="/chat" asChild>
        <Button
          className="absolute bottom-12 w-full bg-blue-500 h-16 rounded-3xl "
          size="md"
          variant="solid"
          action="default"
        >
          <ButtonText className="text-xl">Criar conta</ButtonText>
        </Button>
      </Link>
    </SafeAreaView>
  );
}
