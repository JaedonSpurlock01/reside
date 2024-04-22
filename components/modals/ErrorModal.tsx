"use client";

import React from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import useErrorModal from "@/hooks/useErrorModal";
import ErrorForm from "../auth/error/ErrorForm";

const ErrorModal = () => {
  const loginModal = useLoginModal();
  const errorModal = useErrorModal();

  const body = (
    <ErrorForm
      handleBackRef={() => {
        errorModal.onClose();
        loginModal.onOpen();
      }}
    />
  );

  return (
    <Modal
      isOpen={errorModal.isOpen}
      title="Welcome back"
      onClose={errorModal.onClose}
      body={body}
      noButton
    />
  );
};

export default ErrorModal;
