"use client";

import React from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import LoginForm from "../auth/login/LoginForm";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const body = (
    <LoginForm
      handleBackRef={() => {
        loginModal.onClose();
        registerModal.onOpen();
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
