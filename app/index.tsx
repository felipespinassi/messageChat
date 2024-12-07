import { Button } from "@/components/Button";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button label="Hello World" variant={"default"} />
    </View>
  );
}
