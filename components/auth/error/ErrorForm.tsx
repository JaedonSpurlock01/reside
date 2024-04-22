import React from "react";
import BackButton from "../BackButton";
import { BsExclamationCircle } from "react-icons/bs";

interface ErrorCardProps {
  handleBackRef?: () => void;
}

const ErrorForm: React.FC<ErrorCardProps> = ({ handleBackRef }) => {
  return (
    <div>
      <div className="w-full flex justify-center items-center mb-8">
        <BsExclamationCircle className="text-destructive" />
      </div>
      <BackButton handleBackRef={handleBackRef} label="Back to login" />
    </div>
  );
};

export default ErrorForm;
