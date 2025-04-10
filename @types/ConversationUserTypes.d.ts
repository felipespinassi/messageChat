export interface ConversationUserTypes {
  createdAt: string;
  id: string;
  isGroup: boolean;
  messages: Messages[];
}

interface Messages {
  content: string;
  id: string;
  type: string;
  userId: string;
}
