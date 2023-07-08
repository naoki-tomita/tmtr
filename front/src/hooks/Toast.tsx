import React, { FC, ReactNode, createContext, useContext, useState } from "react";


type Toast = { text: string };
function useToastInner() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  return {
    toasts,
    toast(toast: Toast) {
      setToasts(t => [...t, toast]);
      setTimeout(() => setToasts(t => t.slice(1)), 3000);
    },
  };
}

export const Toast = () => {
  const { toasts } = useToast();
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 2,
      padding: 32,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      alignItems: "end",
    }}>
      {toasts.map((it, i) =>
        <p key={i} style={{ textAlign: "end" }}>
          <sup>{it.text}</sup>
        </p>
      )}
    </div>
  );
}

const Context = createContext<ReturnType<typeof useToastInner>>({ toasts: [] } as any);
export const ToastProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const value = useToastInner();
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useToast() {
  return useContext(Context)
}
