import fetcher from "@/services/fetcher";

export async function CreateConversation(
  userRef: any,
  id: string,
  responseRef: any
) {
  const response = await fetcher(
    `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
    {
      method: "POST",
      body: JSON.stringify({
        isGroup: false,
        users: [userRef.current.id, Number(id)],
      }),
    }
  );

  responseRef.current = response;
}
