import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import LoadingPage from "../pages/LoadingPage";
import { SessionContext } from "./SessionContext";

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
