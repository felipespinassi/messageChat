import { User } from "@/@types/UserTypes";
import fetcher from "@/services/fetcher";

export async function CreateConversation(
  user: User,
  id: string,
  responseRef: any
) {
  const response = await fetcher(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
    {
      method: "POST",
      body: JSON.stringify({
        isGroup: false,
        users: [user.id, Number(id)],
      }),
    }
  );

  responseRef.current = response;
}
