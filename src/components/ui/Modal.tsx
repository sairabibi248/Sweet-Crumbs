import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type ModalProps = {
  /** Content shown inside the popup like a form or a dialog */
  children: ReactNode;
  /** Runs when the user clicks outside the popup */
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
