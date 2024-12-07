import { Button } from "@/components/Button";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex flex-1 m-2 ">
      <View>
        <Text className="text-5xl font-bold">
          Deixe sua comunicação mais incrível com
        </Text>

        <Button size={"lg"} label="Message Chat" />
      </View>

      <Button
        className="w-full rounded-3xl h-16 absolute bottom-12  "
        size={"lg"}
        label="Criar conta"
      />
    </SafeAreaView>
  );
}
