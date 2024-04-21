"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { HoverBorderGradient } from "../HoverBorderGradient";
import LoginButton from "../auth/login/LoginButton";
import RegisterButton from "../auth/register/RegisterButton";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  user: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const loginModal = useLoginModal();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* <div
          onClick={() => {
            if (!user) {
              loginModal.onOpen();
            }
          }}
          className="hidden md:block py-3 px-4 rounded-full hover:bg-neutral-700 transition cursor-pointer"
        >
          My Favorites
        </div> */}
        <HoverBorderGradient
          containerClassName="rounded-xl"
          className="bg-neutral-700 shadow-2xl"
          as="div"
          onClick={toggleOpen}
        >
          <div className="p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 rounded-lg cursor-pointer hover:shadow-sm transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar imageSrc={user && user.image} />
            </div>
          </div>
        </HoverBorderGradient>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[15rem] bg-neutral-700 overflow-hidden right-0 top-[4.5rem] text-sm">
          <div className="flex flex-col">
            {!user ? (
              <>
                <LoginButton mode="modal">
                  <MenuItem label="Log in" />
                </LoginButton>
                <RegisterButton mode="modal">
                  <MenuItem label="Sign up" />
                </RegisterButton>
              </>
            ) : (
              <>
                <MenuItem borderBottom disabled label={`${user.name}`} />
                <MenuItem label="Add listing" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem
                  label="Settings"
                  onClick={() => {
                    router.push("/settings");
                  }}
                />
                <MenuItem
                  label="Log out"
                  onClick={() => {
                    signOut();
                  }}
                  borderTop
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
