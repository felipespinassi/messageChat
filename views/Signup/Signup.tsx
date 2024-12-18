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
import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import ArrowBack from "@/components/ArrowBack/ArrowBack";

export default function Signup() {
  return (
    <SafeAreaView className="flex-1 mx-4 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0} // Ajuste conforme necessário
      >
        <ArrowBack />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-10 mt-5">
            <ScreenTitle
              title="Cadastro"
              description="Finalize o cadastro para criar uma nova conta"
            />

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
