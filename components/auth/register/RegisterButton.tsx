import React, { useState } from "react";

import { useRouter } from "next/navigation";
import useRegisterModal from "@/hooks/useRegisterModal";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  children,
  mode = "redirect",
  asChild,
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    if (mode === "modal") {
      if (isOpen) {
        registerModal.onClose();
      } else {
        registerModal.onOpen();
      }
      setIsOpen((value) => !value);
    }
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default RegisterButton;
