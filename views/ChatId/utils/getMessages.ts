import { Messages } from "@/@types/ConversationUserTypes";
import { Dispatch, SetStateAction } from "react";

export async function getMessages(
  data: any,
  setMessages: Dispatch<SetStateAction<Messages[]>>,
  responseRef: any
) {
  setMessages(data?.messages || []);
  if (data) {
    responseRef.current = data;
  }
}
