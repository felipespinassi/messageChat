import { Messages } from "./ConversationUserTypes";

interface ConversationTypes {
  createdAt: string;
  updatedAt: string;
  id: string;
  isGroup: boolean;
  message: {
    content: string;
    id: string;
    type: string;
    userId: string;
    createdAt: string;
  };
  users: [
    {
      id: string;
      name: string;
      name: string;
    }
  ];
  name: string | null;
}
