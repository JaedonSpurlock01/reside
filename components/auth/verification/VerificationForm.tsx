"use client";

import React, { useCallback, useEffect, useState } from "react";
import BackButton from "../BackButton";
import { newVerification } from "@/actions/newVerification";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import FormSuccess from "@/components/FormSuccess";
import FormError from "@/components/FormError";

interface VerificationFormProps {
  handleBackRef?: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  handleBackRef,
}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center mb-8 gap-2 text-emerald-500">
        {!success && !error && (
          <BeatLoader color="#06B6D4" size={20} speedMultiplier={1} />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>

      <BackButton handleBackRef={handleBackRef} label="Back to login" />
    </div>
  );
};

export default VerificationForm;
