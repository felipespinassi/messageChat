export interface ConversationUserTypes {
  createdAt: string;
  id: string;
  isGroup: boolean;
  messages: Messages[];
  user: {
    id: number;
    email: string;
    name: string;
  };
}

interface Messages {
  content: string;
  id: string;
  type: string;
  userId: string;
  userName: string;
}
