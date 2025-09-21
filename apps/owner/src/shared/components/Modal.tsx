"use client";

import { useUIStore } from "@/shared/state/ui.store";
import { Modal as UIModal } from "@ui";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

export function Modal({ 
  id, 
  title, 
  children, 
  size = "md", 
  showCloseButton = true,
  footer 
}: ModalProps) {
  const { modals, closeModal } = useUIStore();
  const isOpen = modals[id] || false;

  const handleClose = () => {
    closeModal(id);
  };

  return (
    <UIModal
      open={isOpen}
      onClose={handleClose}
      title={title}
      size={size}
    >
      {children}
    </UIModal>
  );
}
