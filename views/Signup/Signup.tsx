import React from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import ArrowBack from "@/components/ArrowBack/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Input, InputField } from "@/components/ui/input";

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const errorMessage = "Campo obrigatório";
  const { trigger } = useSWRMutation(
    `${process.env.EXPO_PUBLIC_BASE_URL}users`,
    createUser,
    {
      onSuccess: () => alert("Usuário criado com sucesso"),
      onError: () => alert("Erro ao criar usuário"),
    }
  );

  async function createUser(url: string, { arg }: { arg: any }) {
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

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function onSubmit(data: any) {
    try {
      await trigger(data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ArrowBack />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box gap="l" marginTop="m">
            <ScreenTitle
              title="Cadastro"
              description="Finalize o cadastro para criar uma nova conta"
            />

            <Box gap="l">
              <Box gap="xs">
                <Text>Nome</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input style={{ height: 56, borderRadius: 8 }}>
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                  name="name"
                />
                {errors.name && <Text color="destructive">{errorMessage}</Text>}
              </Box>

              <Box gap="xs">
                <Box gap="xs">
                  <Text>Email</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input style={{ height: 56, borderRadius: 8 }}>
                        <InputField
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Input>
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text color="destructive">{errorMessage}</Text>
                  )}
                </Box>
              </Box>

              <Box gap="xs">
                <Text>Senha</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input style={{ height: 56, borderRadius: 8 }}>
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text color="destructive">{errorMessage}</Text>
                )}
              </Box>
              {/* <Box gap="xs">
                <Text>Telefone</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input style={{ height: 56, borderRadius: 8 }}>
                      <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                  name="telefone"
                />
                {errors.name && <Text>This is required.</Text>}
              </Box> */}
            </Box>

            <Box marginTop="m">
              <Button
                size="xl"
                variant="solid"
                style={{ backgroundColor: "#0273FD", borderRadius: 8 }}
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonText>Finalizar cadastro</ButtonText>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
