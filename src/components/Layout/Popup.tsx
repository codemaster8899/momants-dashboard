import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ParentPopup {
  onClose?: () => void;
  children: ReactNode;
}

export const Popup = ({ onClose, children }: ParentPopup) => {
  useEffect(() => {
    // Disable scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Cleanup: restore scrolling when popup unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return createPortal(
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClose) onClose();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-[9999]"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        {onClose && (
          <button onClick={onClose} className="absolute right-3 top-3 z-[40]">
            <X />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};
