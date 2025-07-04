import fetcher from "@/services/fetcher";
import { router } from "expo-router";
import { Users } from "lucide-react-native";
import { FlatList, TouchableOpacity } from "react-native";
import useSWR from "swr";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "../ui/avatar";

export default function ListUsers({
  showCreateGroup,
}: {
  showCreateGroup?: boolean;
}) {
  const { data, error, isLoading }: any = useSWR(
    `${process.env.EXPO_PUBLIC_BASE_URL}users`,
    fetcher
  );

  return (
    <FlatList
      ListHeaderComponent={
        <Box paddingVertical="s">
          <TouchableOpacity onPress={() => router.push("/modal/users")}>
            <Box flexDirection="row" gap="s" alignItems="center">
              <Users color={"blue"} />
              <Text>Criar novo grupo</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      }
      showsVerticalScrollIndicator={false}
      style={{ marginHorizontal: 16, padding: 8, borderRadius: 8 }}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => {
        return (
          <Box flex={1}>
            <TouchableOpacity
              onPress={() => {
                router.replace({
                  pathname: "/chat/[id]",
                  params: {
                    id: item.id ? item.id.toString() : "",
                    name: item.name,
                  },
                });
              }}
            >
              <Box flexDirection="row" gap="m" alignItems="center" padding="s">
                <Avatar size="md">
                  <AvatarFallbackText>{item.name}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: item.imageAvailable
                        ? item.image?.uri
                        : "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
                    }}
                  />
                  <AvatarBadge />
                </Avatar>
                <Text>{item.name}</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        );
      }}
    />
  );
}
