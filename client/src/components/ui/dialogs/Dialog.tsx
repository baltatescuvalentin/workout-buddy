import React, { useEffect, useRef } from "react";

interface IDialog {
  children: React.ReactNode;
  showModal: boolean;
  styles?: string;
}

function Dialog({ children, showModal, styles }: IDialog) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!showModal && ref.current?.open) {
      ref.current?.close();
    } else if (showModal && !ref.current?.open) {
      ref.current?.showModal();
    }
  }, [showModal, ref]);

  return (
    <dialog
      className={`z-100 bg-white rounded-md py-5 px-7 -translate-1/2 top-1/2 left-1/2 inset-0 focus:border-none focus:outline-none min-w-[90%] sm:min-w-md max-h-[90%] ${styles}`}
      ref={ref}
    >
      {children}
    </dialog>
  );
}

export default Dialog;
