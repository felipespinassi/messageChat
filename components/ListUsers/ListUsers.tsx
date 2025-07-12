import fetcher from "@/services/fetcher";
import { router } from "expo-router";
import { Circle, CircleCheck, Users } from "lucide-react-native";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useSWR from "swr";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import Avatar from "../Avatar/Avatar";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { useRef, useState } from "react";
import { TouchableOpacityBox } from "../RestyleComponents/TouchableOpacity";
import Button from "../Button/Button";
import useSWRMutation from "swr/mutation";
import Input from "../Input/Input";

export default function ListUsers({
  showCreateGroup,
}: {
  showCreateGroup?: boolean;
}) {
  const { data, error, isLoading }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}users`,
    fetcher
  );
  const [usersSelected, setUsersSelected] = useState<string[]>([]);
  const groupNameRef = useRef<string>("");

  const theme = useTheme<Theme>();

  function onSelectUser(id: string) {
    if (usersSelected.includes(id)) {
      setUsersSelected(usersSelected.filter((user) => user !== id));
    } else {
      setUsersSelected([...usersSelected, id]);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
    createGroup,
    {
      onSuccess: () => {
        router.push({ pathname: "/chatList" });
      },
    }
  );

  async function createGroup(url: string) {
    const response = await fetcher(url, {
      method: "POST",
      body: JSON.stringify({
        users: usersSelected,
        name: groupNameRef.current,
        isGroup: true,
      }),
    });

    return response;
  }

  function onFinish() {
    if (!groupNameRef.current) {
      return Alert.alert("Por favor, informe o nome do grupo.");
    }
    trigger();
  }

  return (
    <>
      {isLoading ? (
        <Box flex={1} bg="background" justifyContent="center">
          <ActivityIndicator size={"large"} />
        </Box>
      ) : (
        <Box padding="s" flex={1} flexShrink={1} flexBasis={0}>
          <Box paddingVertical="s">
            {showCreateGroup && (
              <TouchableOpacity onPress={() => router.push("/modal/users")}>
                <Box flexDirection="row" gap="s" alignItems="center">
                  <Users color={theme.colors.primary} />
                  <Text color="foreground">Criar novo grupo</Text>
                </Box>
              </TouchableOpacity>
            )}

            {!showCreateGroup && (
              <Box gap="s">
                <Input
                  placeholder="Nome do grupo"
                  onChangeText={(e) => (groupNameRef.current = e)}
                />
                <Button
                  disabled={usersSelected.length == 0}
                  loading={isMutating}
                  onPress={onFinish}
                >
                  Criar grupo
                </Button>
              </Box>
            )}

            {usersSelected.length > 0 && (
              <Box
                marginTop="s"
                flexDirection="row"
                gap="s"
                padding="m"
                justifyContent="space-between"
              >
                <Text color="foreground">
                  {usersSelected.length} Selecionados
                </Text>
                <TouchableOpacityBox
                  onPress={() => {
                    setUsersSelected([]);
                  }}
                >
                  <Text color="primary">Cancelar seleçao</Text>
                </TouchableOpacityBox>
              </Box>
            )}
          </Box>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({ item }) => {
              const isSelected = usersSelected.includes(item.id);
              return (
                <Box flex={1}>
                  <TouchableOpacity
                    onPress={() => {
                      usersSelected.length > 0
                        ? onSelectUser(item.id)
                        : !showCreateGroup
                        ? onSelectUser(item.id)
                        : router.replace({
                            pathname: "/chat/[id]",
                            params: {
                              id: item.id ? item.id.toString() : "",
                              name: item.name,
                            },
                          });
                    }}
                  >
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      bg={isSelected ? "selectedItem" : "background"}
                    >
                      <Box
                        padding="s"
                        alignItems="center"
                        flexDirection="row"
                        gap="m"
                      >
                        {!showCreateGroup ? (
                          isSelected ? (
                            <CircleCheck
                              size={30}
                              color={theme.colors.primary}
                            />
                          ) : (
                            <Circle size={30} color={theme.colors.primary} />
                          )
                        ) : null}
                        <Avatar
                          size={50}
                          fallbackText={item.name}
                          uri={
                            item.imageAvailable
                              ? item.image?.uri
                              : "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                          }
                        />

                        <Text color="foreground">{item.name}</Text>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                </Box>
              );
            }}
          />
        </Box>
      )}
    </>
  );
}
