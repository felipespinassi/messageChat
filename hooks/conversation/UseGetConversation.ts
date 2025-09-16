import fetcher from "@/services/fetcher";
import useSWR from "swr";

export function useGetConversation(
  conversation: any,
  isGroup: string | string[],
  id: string | string[]
) {
  const url =
    isGroup === "true"
      ? `${process.env.EXPO_PUBLIC_BASE_URL}conversation/${conversation?.id}`
      : `${process.env.EXPO_PUBLIC_BASE_URL}conversation/user/${id}`;

  const { data, isLoading } = useSWR<any>(url, fetcher);

  return { data, isLoading };
}
