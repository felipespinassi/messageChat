import { User } from "@/@types/UserTypes";
import { getUser } from "@/storage/getUser";
import { RefObject } from "react";

export async function getUserFromLocalStorage(userRef: RefObject<User>) {
  const user: User = await getUser();
  userRef.current = user;
}
