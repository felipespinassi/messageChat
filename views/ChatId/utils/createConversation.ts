import { User } from "@/@types/UserTypes";
import fetcher from "@/services/fetcher";

export async function CreateConversation(id: string, responseRef: any) {
  const response = await fetcher(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
    {
      method: "POST",
      body: JSON.stringify({
        isGroup: false,
        users: [Number(id)],
      }),
    },
  );

  responseRef.current = response;
}
