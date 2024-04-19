import React, { useState } from "react";

import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = "redirect",
  asChild,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    if (mode === "modal") {
      if (isOpen) {
        loginModal.onClose();
      } else {
        loginModal.onOpen();
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

export default LoginButton;
