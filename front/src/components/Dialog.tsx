import React, { FC, ReactNode, useEffect, useRef } from "react";
export const Dialog: FC<{
  open: boolean;
  children: ReactNode | ReactNode[];
  onClose: () => void;
}> = ({ open, children, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => (open ? ref.current?.showModal() : ref.current?.close()), [open])

  return (
    <>
    <style>
      dialog {`{`} color: red; {`}`}
      dialog::backdrop {`{`}background-color: rgba(0, 0, 0, 0.4);{`}`}
    </style>
    <dialog ref={ref} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
    </>
  );
}
