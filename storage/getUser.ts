import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER } from "./storageConfig";
import { User } from "@/@types/UserTypes";

export async function getUser(): Promise<User> {
  try {
    const storage = await AsyncStorage.getItem(USER);

    const user: string = storage ? storage : "";

    return JSON.parse(user);
  } catch (error) {
    throw error;
  }
}
