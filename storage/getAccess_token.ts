import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "./storageConfig";

export async function getAccess_token() {
  try {
    const storage = await AsyncStorage.getItem(ACCESS_TOKEN);

    const access_token: string = storage ? storage : "";

    return access_token;
  } catch (error) {
    throw error;
  }
}
