import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { PenLine, Search } from "lucide-react-native";
const messages = [
  {
    id: 1,
    name: "John Doe",
    message: "Hey, how are you?",
    time: "2:30 PM",
  },
  {
    id: 2,
    name: "Jane Doe",
    message: "I'm good, thanks for asking!",
    time: "2:31 PM",
  },
  {
    id: 3,
    name: "John Doe",
    message: "Want to go out for lunch?",
    time: "2:32 PM",
  },
  {
    id: 4,
    name: "Jane Doe",
    message: "Sure, where do you want to go?",
    time: "2:33 PM",
  },
  {
    id: 5,
    name: "John Doe",
    message: "How about the new restaurant downtown?",
    time: "2:34 PM",
  },
  {
    id: 6,
    name: "Jane Doe",
    message: "Sounds good, see you there!",
    time: "2:35 PM",
  },
];
export default function Index() {
  return (
    <SafeAreaView className="m-4">
      <View className="flex-row justify-between">
        <Text className="text-3xl font-semibold">Conversas</Text>

        <View className="flex-row gap-6">
          <TouchableOpacity>
            <View className="bg-white p-2 rounded-full">
              <Search color={"gray"} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="bg-white p-2 rounded-full">
              <PenLine color={"gray"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        className="py-4"
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View className="flex flex-row py-4  items-center">
              <Image
                className="w-14 h-14 rounded-full"
                source={{
                  uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
                }}
              />
              <View className="flex flex-1">
                <Text className="font-bold">{item.name}</Text>
                <Text>{item.message}</Text>
              </View>
              <Text>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
