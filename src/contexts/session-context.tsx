"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export type Session = {
  firstName: string;
  avatar: string;
  email: string;
  roles?: string[];
};
type SessionContextType = {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({
  session: initialSession,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("https://localhost/api/auth/session", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      }
    };
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
