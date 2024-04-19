"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { HoverBorderGradient } from "../HoverBorderGradient";
import LoginButton from "../auth/LoginButton";
import RegisterButton from "../auth/RegisterButton";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block py-3 px-4 rounded-full hover:bg-neutral-700 transition cursor-pointer"
        >
          Add Listing
        </div>
        <HoverBorderGradient
          containerClassName="rounded-xl"
          className="bg-neutral-700 shadow-2xl"
          as="div"
          onClick={toggleOpen}
        >
          <div className="p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 rounded-lg cursor-pointer hover:shadow-sm transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar />
            </div>
          </div>
        </HoverBorderGradient>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[15vw] bg-neutral-700 overflow-hidden right-0 top-[4.5rem] text-sm">
          <div className="flex flex-col">
            <>
              <LoginButton mode="modal">
                <MenuItem label="Login" />
              </LoginButton>
              <RegisterButton mode="modal">
                <MenuItem label="Sign up" />
              </RegisterButton>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
