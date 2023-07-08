import React, { FC } from "react";
import { useTomeeta } from "../hooks/Tomeeta";

export const TomeetaListPage: FC = () => {
  const { tomeeta } = useTomeeta();
  return (
    <main>
      <section style={{ flexDirection: "column", alignItems: "center" }}>
        {tomeeta.map(it => (
          <aside key={it.id}>
            <p>{it.user.name}</p>
            <p>{it.text}</p>
          </aside>
        ))}
      </section>
    </main>
  );
}
