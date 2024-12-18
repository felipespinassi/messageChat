import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ArrowBack from "@/components/ArrowBack/ArrowBack";
import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";

export default function Login() {
  return (
    <SafeAreaView className="m-4 gap-10">
      <ArrowBack />
      <ScreenTitle
        title="Entrar"
        description="Por favor, entre com Email e senha"
      />

      <View className="gap-10">
        <View className="gap-1">
          <Text>Email</Text>
          <Input className="h-14 rounded-lg ">
            <InputField />
          </Input>
        </View>

        <View className="gap-1">
          <Text>Senha</Text>
          <Input className="h-14 rounded-lg">
            <InputField type="password" />
          </Input>
        </View>
      </View>

      <View className="mt-5">
        <Link href={"/chat"} asChild>
          <Button size="xl" variant="solid" className="bg-blue-500 rounded-lg">
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
