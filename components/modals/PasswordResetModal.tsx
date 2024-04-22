"use client";

import React from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import usePasswordResetModal from "@/hooks/usePasswordResetModal";
import ResetForm from "../auth/reset/ResetForm";

const PasswordResetModal = () => {
  const loginModal = useLoginModal();
  const passwordResetModal = usePasswordResetModal();

  const body = (
    <ResetForm
      handleBackRef={() => {
        passwordResetModal.onClose();
        loginModal.onOpen();
      }}
    />
  );

  return (
    <Modal
      isOpen={passwordResetModal.isOpen}
      title="Reset Password"
      onClose={passwordResetModal.onClose}
      body={body}
      noButton
    />
  );
};

export default PasswordResetModal;
