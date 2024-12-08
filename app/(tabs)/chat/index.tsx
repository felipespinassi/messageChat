import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { PenLine, Search } from "lucide-react-native";

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
    </SafeAreaView>
  );
}
