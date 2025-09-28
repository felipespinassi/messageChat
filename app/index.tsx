import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getAccess_token } from "@/storage/getAccess_token";
import PresentationView from "@/views/Presentation/Presentation";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const token = await getAccess_token();
        if (token) {
          router.replace("/(authenticated)/(tabs)/chatList");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        // Em caso de erro, mantém na tela de apresentação
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return <PresentationView />;
}
