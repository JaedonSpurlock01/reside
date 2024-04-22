"use client";

import React from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import LoginForm from "../auth/login/LoginForm";
import usePasswordResetModal from "@/hooks/usePasswordResetModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const passwordResetModal = usePasswordResetModal();

  const body = (
    <LoginForm
      handleBackRef={() => {
        loginModal.onClose();
        registerModal.onOpen();
      }}
      handlePasswordReset={() => {
        loginModal.onClose();
        passwordResetModal.onOpen();
      }}
    />
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Welcome back"
      onClose={loginModal.onClose}
      body={body}
      noButton
    />
  );
};

export default LoginModal;
