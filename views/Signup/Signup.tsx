import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

export default function Signup() {
  return (
    <SafeAreaView className="flex-1 mx-4 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0} // Ajuste conforme necessário
      >
        <TouchableOpacity onPress={() => router.back()} className="m-2">
          <View className="flex-row gap-1 items-center">
            <ChevronLeft />
            <Text className="font-semibold">Voltar</Text>
          </View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-10 mt-5">
            <View className="gap-1 p-2">
              <Text className="text-5xl text-blue-500 font-semibold">
                Cadastro
              </Text>
              <Text className="font-semibold">
                Finalize o cadastro para criar uma nova conta
              </Text>
            </View>

            <View className="gap-10">
              <View className="gap-1">
                <Text>Nome</Text>
                <Input className="h-14 rounded-lg ">
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
                  <InputField type="password" />
                </Input>
              </View>
              <View className="gap-1">
                <Text>Telefone</Text>
                <Input className="h-14 rounded-lg">
                  <InputField keyboardType="phone-pad" />
                </Input>
              </View>
            </View>

            <View className="mt-5">
              <Button
                size="xl"
                variant="solid"
                className="bg-blue-500 rounded-lg"
              >
                <ButtonText>Finalizar cadastro</ButtonText>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
