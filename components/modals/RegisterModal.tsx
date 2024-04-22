"use client";

import React from "react";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import RegisterForm from "../auth/register/RegisterForm";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const body = (
    <RegisterForm
      handleBackRef={() => {
        registerModal.onClose();
        loginModal.onOpen();
      }}
    />
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Welcome to Reside"
      onClose={registerModal.onClose}
      body={body}
      noButton
    />
  );
};

export default RegisterModal;
