import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import ScreenTitle from "@/components/ScreenTitle/ScreenTitle";
import ArrowBack from "@/components/ArrowBack/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import useSWRMutation from "swr/mutation";

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
    "http://192.168.100.7:3000/users",
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
                      />
                    </Input>
                  )}
                  name="name"
                />
                {errors.name && (
                  <Text className="text-red-500">{errorMessage}</Text>
                )}
              </View>

              <View className="gap-1">
                <View className="gap-1">
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
                        />
                      </Input>
                    )}
                    name="email"
                  />
                  {errors.name && (
                    <Text className="text-red-500">{errorMessage}</Text>
                  )}
                </View>
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
                      />
                    </Input>
                  )}
                  name="password"
                />
                {errors.name && (
                  <Text className="text-red-500">{errorMessage}</Text>
                )}
              </View>
              {/* <View className="gap-1">
                <Text>Telefone</Text>
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
                      />
                    </Input>
                  )}
                  name="telefone"
                />
                {errors.name && <Text>This is required.</Text>}
              </View> */}
            </View>

            <View className="mt-5">
              <Button
                size="xl"
                variant="solid"
                className="bg-blue-500 rounded-lg"
                onPress={handleSubmit(onSubmit)}
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
