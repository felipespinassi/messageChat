import fetcher from "@/services/fetcher";
import { router } from "expo-router";
import { Users } from "lucide-react-native";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
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
    createGroup
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

  return (
    <>
      {isLoading ? (
        <Box flex={1} bg="background" justifyContent="center">
          <ActivityIndicator size={"large"} />
        </Box>
      ) : (
        <FlatList
          ListHeaderComponent={
            <Box paddingVertical="s">
              {/* <TouchableOpacity onPress={() => router.push("/modal/users")}>
                <Box flexDirection="row" gap="s" alignItems="center">
                  <Users color={theme.colors.primary} />
                  <Text color="foreground">Criar novo grupo</Text>
                </Box>
              </TouchableOpacity> */}
              <Input onChangeText={(e) => (groupNameRef.current = e)} />
              <Button loading={isMutating} onPress={() => trigger()}>
                Criar grupo
              </Button>

              {usersSelected.length > 0 && (
                <Box
                  marginTop="s"
                  flexDirection="row"
                  gap="s"
                  bg="selectedItem"
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
          }
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 16,
            padding: 8,
            borderRadius: 8,
            backgroundColor: theme.colors.background,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => {
            return (
              <Box
                flex={1}
                bg={usersSelected.includes(item.id) ? "selectedItem" : "none"}
              >
                <TouchableOpacity
                  onLongPress={() => onSelectUser(item.id)}
                  onPress={() => {
                    usersSelected.length > 0
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
                    gap="m"
                    alignItems="center"
                    padding="s"
                  >
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
                </TouchableOpacity>
              </Box>
            );
          }}
        />
      )}
    </>
  );
}
