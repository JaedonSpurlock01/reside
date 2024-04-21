"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div>
      {JSON.stringify(user)}{" "}
      <button type="submit" onClick={onClick}>
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
