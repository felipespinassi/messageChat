import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";

export default function index() {
  return (
    <SafeAreaView className="m-2  flex-1 gap-10 ">
      <TouchableOpacity onPress={() => router.back()}>
        <View className="flex-row gap-1 items-center">
          <ChevronLeft />
          <Text className="font-semibold">Voltar</Text>
        </View>
      </TouchableOpacity>

      <View className="gap-1 p-2">
        <Text className="text-4xl text-blue-500 font-semibold">Cadastro</Text>
        <Text className="font-semibold">
          Finalize o cadastro para criar uma nova conta
        </Text>
      </View>

      <View className="gap-4">
        <View className="gap-1">
          <Text>Nome</Text>
          <Input className="h-14 rounded-lg">
            <InputField />
          </Input>
        </View>

        <View className="gap-1">
          <Text>E-mail</Text>
          <Input className="h-14 rounded-lg">
            <InputField />
          </Input>
        </View>

        <View className="gap-1">
          <Text>Senha</Text>
          <Input className="h-14 rounded-lg">
            <InputField />
          </Input>
        </View>
      </View>

      <View>
        <Button size="xl" variant="solid" className="bg-blue-500 rounded-lg">
          <ButtonText>Finalizar cadastro</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
