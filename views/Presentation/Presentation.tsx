import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function Presentation() {
  return (
    <SafeAreaView className="flex flex-1 m-4 justify-center gap-64  ">
      <ScreenTitle title="Bem-vindo" description="Vamos começar" />

      <View className="gap-5">
        <View className="gap-2">
          <Text className="font-semibold text-xl">Entrar/Criar conta</Text>
          <Link href="/login" asChild>
            <Button
              className=" w-full bg-blue-500 h-14 rounded-xl "
              size="md"
              variant="solid"
              action="default"
            >
              <ButtonText className="text-xl">Entrar</ButtonText>
            </Button>
          </Link>
        </View>

        <View className="flex-row gap-1 items-center">
          <Text className=" font-semibold text-xl">Novo usuario?</Text>
          <Link href="/signup" className="text-blue-500 text-xl">
            Criar conta
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
