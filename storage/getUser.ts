import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER } from "./storageConfig";

export async function getUser() {
  try {
    const storage = await AsyncStorage.getItem(USER);

    const user: string = storage ? storage : "";

    return JSON.parse(user);
  } catch (error) {
    throw error;
  }
}
