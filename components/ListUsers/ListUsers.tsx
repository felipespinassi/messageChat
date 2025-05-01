import fetcher from "@/services/fetcher";
import { router } from "expo-router";
import { Users } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useSWR from "swr";
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
        <View className=" pt-2 pb-2 ">
          <TouchableOpacity
            onPress={() => router.push("/modal/users")}
            className="flex-row gap-3"
          >
            <Users color={"blue"} />
            <Text>Criar novo grupo</Text>
          </TouchableOpacity>
        </View>
      }
      showsVerticalScrollIndicator={false}
      className=" mx-4 rounded-md p-2"
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => {
        return (
          <View className="flex-1 ">
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
              <View className="flex flex-row gap-4 items-center p-2 ">
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
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}
