import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import ArrowBack from "@/components/ArrowBack/ArrowBack";
import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { createAccess_token } from "@/storage/createAccess_Token";
import { createUser } from "@/storage/createUser";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

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

  async function auth(url: string, { arg }: { arg: any }) {
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

  function onSubmit(data: any) {
    trigger(data);
  }

  return (
    <Box flex={1} padding="m" gap="xl" bg="background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnable}
        >
          <Box gap="xl" marginTop="xl">
            {/* <Image
              style={{ width: '100%', height: 112 }}
              resizeMode="contain"
              source={require("assets/logos/pingPrimary.png")}
            /> */}
            <ScreenTitle
              title="Entrar"
              description="Por favor, entre com Email e senha"
            />

            <Box gap="l">
              <Box gap="xs">
                <Text color="foreground">Email</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onEndEditing={() => setScrollEnable(false)}
                      onFocus={() => setScrollEnable(true)}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text color="destructive">{errorMessage}</Text>
                )}
              </Box>

              <Box gap="xs">
                <Text color="foreground">Senha</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onEndEditing={() => setScrollEnable(false)}
                      onFocus={() => setScrollEnable(true)}
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text color="destructive">{errorMessage}</Text>
                )}
                <Box
                  justifyContent="flex-end"
                  flexDirection="row"
                  paddingTop="xs"
                >
                  <Text color="secondary">Esqueceu a senha?</Text>
                </Box>
              </Box>
            </Box>

            <Box marginTop="m">
              <Button
                loading={isMutating}
                action="primary"
                disabled={isMutating}
                size={40}
                variant="solid"
                onPress={handleSubmit(onSubmit)}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
