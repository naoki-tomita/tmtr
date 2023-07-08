import React, { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import { client } from "../Supabase";
import { NotLoggedIn, useAuth } from "./Auth";

function useTomeetaInner() {
  const { user } = useAuth();
  const [tomeeta, setTomeeta] = useState<Array<{
    id: string;
    user: {
      name: string;
      bio: string;
    };
    text: string;
  }>>([]);

  async function fetchTomeeta() {
    const { data } = await client.from("tomeeta").select("*,profile(id,name,bio)").order("created_at", { ascending: false });
    setTomeeta(data!.map(it => ({
      id: it.id,
      user: {
        name: it.profile!.name,
        bio: it.profile!.bio,
      },
      text: it.text
    })));
  }

  useEffect(() => { fetchTomeeta() }, []);

  return {
    tomeeta,
    async tomita(text: string) {
      if (user == null) {
        return;
      }
      if (user === NotLoggedIn) {
        return;
      }
      await client.from("tomeeta").insert({ text, user: user.id })
      await fetchTomeeta();
    },
  };
}

export const Tomeeta = () => {
  const { tomita } = useTomeeta();
  const [text, setText] = useState("");
  return (
    <>
      <textarea
        placeholder="What are you doing?"
        onChange={e => setText(e.target.value)}
        value={text}
      ></textarea>
      <button type="submit" onClick={() => tomita(text)}>Send</button>
    </>
  );
}

const Context = createContext<ReturnType<typeof useTomeetaInner>>({} as any);
export const TomeetaProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const value = useTomeetaInner();
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useTomeeta() {
  return useContext(Context);
}
