import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { getProfile } from "@/services/auth";

export function useUser() {
  const [user, setUser] = useState<Session["user"] | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getProfile();
        setUser(data.user || null);
      } catch (error) {
        console.error("Falha ao carregar o usuário:", error);
        setUser(null);
      }
    }

    loadUser();
  }, []);

  return user;
}
