import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER } from "./storageConfig";

export async function createUser(user: any) {
  try {
    await AsyncStorage.setItem(USER, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
}
