import { ConversationTypes } from "@/@types/ConversationTypes";

export function compare(a: ConversationTypes, b: ConversationTypes) {
  if (a.message.createdAt < b.message.createdAt) {
    return 1;
  }
  if (a.message.createdAt > b.message.createdAt) {
    return -1;
  }
  return 0;
}
