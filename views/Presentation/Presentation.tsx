import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Button, ButtonText } from "@/components/ui/button";
import { Link, router } from "expo-router";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function Presentation() {
  return (
    <SafeAreaView className="flex flex-1 m-4 justify-center gap-64  ">
      <ScreenTitle title="Bem-vindo" description="Vamos começar" />

      <View className="gap-5">
        <View className="gap-2">
          <Text className="font-semibold text-xl">Entrar/Criar conta</Text>
          <Button
            onPress={() => router.replace("/login")}
            className=" w-full bg-primary-500 h-14 rounded-xl "
            size="md"
            variant="solid"
            action="default"
          >
            <ButtonText className="text-xl">Entrar</ButtonText>
          </Button>
        </View>

        <View className="flex-row gap-1 items-center">
          <Text className=" font-semibold text-xl">Novo usuario?</Text>
          <Link href="/signup" className="text-primary-500 text-xl">
            Criar conta
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
