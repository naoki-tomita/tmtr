import React, { FC, ReactNode } from "react";
export const Dialog: FC<{
  open: boolean;
  children: ReactNode | ReactNode[];
}> = ({ open, children }) => {
  return (
    <>
    <style>
      dialog {`{`} color: red; {`}`}
      dialog::backdrop {`{`}background-color: rgba(0, 0, 0, 0.4);{`}`}
    </style>
    <dialog open={open}>
      {children}
    </dialog>
    </>
  );
}
