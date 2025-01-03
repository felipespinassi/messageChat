import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "./storageConfig";

export async function createAccess_token(access_token: string) {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, access_token);
    console.log("Access token created");
  } catch (error) {
    console.log("Error creating access token");
    throw error;
  }
}
