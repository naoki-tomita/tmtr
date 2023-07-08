import React, { createContext, useState, ReactNode, FC, useEffect, useContext } from "react";
import { client } from "../Supabase";
import { useToast } from "./Toast";

type User = {
  id: string;
  name: string;
  bio: string;
}

export const NotLoggedIn = "NOT_LOGGED_IN";

async function fetchProfile(id: string) {
  const { data } = await client.from("profile").select().filter("id", "eq", id);
  return data![0];
}

function useAuthInner() {
  async function fetchUser() {
    const { data: { user: fetchedUser } } = await client.auth.getUser()
    if (fetchedUser) {
      const { id, name, bio } = await fetchProfile(fetchedUser.id);
      setUser({ id, name, bio })
    } else {
      setUser(NotLoggedIn);
    }
  }

  const [user, setUser] = useState<typeof NotLoggedIn | User | null>(null);
  const { toast } = useToast();
  useEffect(() => { fetchUser() }, [JSON.stringify(user)]);

  return {
    user: user,
    async signIn(email: string, password: string) {
      await client.auth.initialize();
      const { data: { user: fetchedUser } } = await client.auth.signInWithPassword({ email, password });
      const { id, name, bio } = await fetchProfile(fetchedUser!.id);
      setUser({ id, name, bio });
      toast({ text: "Logged in!" });
    },
    async signOut() {
      await client.auth.initialize();
      await client.auth.signOut();
      setUser(null);
      toast({ text: "Logged out!" });
    },
  }
}


const Context = createContext<ReturnType<typeof useAuthInner>>({} as any);
export function useAuth() {
  return useContext(Context);
}
export const AuthProvider: FC<{ children: ReactNode[] | ReactNode }> = ({ children }) => {
  const user = useAuthInner();
  return <Context.Provider value={user}>{children}</Context.Provider>;
}
