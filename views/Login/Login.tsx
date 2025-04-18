import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import ArrowBack from "@/components/ArrowBack/ArrowBack";
import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { createAccess_token } from "@/storage/createAccess_Token";
import { createUser } from "@/storage/createUser";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const errorMessage = "Campo obrigatório";

  const [scrollEnable, setScrollEnable] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.EXPO_PUBLIC_BASE_URL}auth`,
    auth
  );

  async function auth(url: string, { arg }: { arg: LoginDto }) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro na requisição");
      }

      const data = await response.json();

      Promise.all([
        createUser(data.user),
        createAccess_token(data.access_token),
      ]);
      router.replace("/chatList");

      return data;
    } catch (error) {
      Alert.alert("Erro", "Usuário ou senha inválidos");
      console.log(error);

      throw error;
    }
  }

  function onSubmit(data: LoginDto) {
    trigger(data);
  }

  return (
    <SafeAreaView className="m-4 gap-10 flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 "
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnable}
        >
          <View className="gap-16 mt-28 ">
            {/* <Image
              className=" w-full h-28"
              resizeMode="contain"
              source={require("assets/logos/pingPrimary.png")}
            /> */}
            <ScreenTitle
              title="Entrar"
              description="Por favor, entre com Email e senha"
            />

            <View className="gap-10">
              <View className="gap-1 ">
                <Text>Email</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-14 rounded-lg ">
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onEndEditing={() => setScrollEnable(false)}
                        onFocus={() => setScrollEnable(true)}
                      />
                    </Input>
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text className="text-red-500">{errorMessage}</Text>
                )}
              </View>

              <View className="gap-1">
                <Text>Senha</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-14 rounded-lg ">
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onEndEditing={() => setScrollEnable(false)}
                        onFocus={() => setScrollEnable(true)}
                      />
                    </Input>
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text className="text-red-500">{errorMessage}</Text>
                )}
                <View className="justify-end  flex-row pt-2">
                  <Text className="text-orange-400">Esqueceu a senha?</Text>
                </View>
              </View>
            </View>

            <View className="mt-5">
              <Button
                action="primary"
                disabled={isMutating}
                size="xl"
                variant="solid"
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonText>Entrar</ButtonText>
                {isMutating && <ButtonSpinner />}
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
