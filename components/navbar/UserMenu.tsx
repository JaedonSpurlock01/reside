import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { HoverBorderGradient } from "../HoverBorderGradient";
import LoginButton from "../auth/login/LoginButton";
import RegisterButton from "../auth/register/RegisterButton";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { IoMdAdd, IoMdPerson, IoMdSettings } from "react-icons/io";
import { MdFavorite, MdPrivacyTip } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";

interface UserMenuProps {
  user: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loginModal = useLoginModal();
  const router = useRouter();

  const toggleOpen = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            if (!user) {
              loginModal.onOpen();
              return;
            }
            router.push("/favorites");
          }}
          className="hidden md:block py-3 px-4 rounded-full hover:bg-neutral-700 transition cursor-pointer"
        >
          My Favorites
        </div>
        <HoverBorderGradient
          containerClassName="rounded-xl"
          className="bg-neutral-700 shadow-2xl"
          as="div"
          onClick={(e) => toggleOpen(e as any)}
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
        <div
          ref={dropdownRef}
          className="absolute rounded-xl shadow-md w-[15rem] bg-neutral-700 overflow-hidden right-0 top-[4.5rem] text-sm"
        >
          <div className="flex flex-col z-50">
            {!user ? (
              <>
                <LoginButton mode="modal">
                  <MenuItem label="Log in" icon={RiLoginBoxFill} />
                </LoginButton>
                <RegisterButton mode="modal">
                  <MenuItem label="Sign up" icon={IoMdPerson} />
                </RegisterButton>
                <MenuItem
                  label="Privacy Policy"
                  onClick={() => {
                    router.push("/policy");
                  }}
                  icon={MdPrivacyTip}
                />
              </>
            ) : (
              <>
                <MenuItem borderBottom disabled label={`${user.name}`} />
                {/* <MenuItem
                  label="Add listing"
                  onClick={() => {}}
                  icon={IoMdAdd}
                /> */}
                <MenuItem
                  label="My Favorites"
                  onClick={() => {
                    if (!user) {
                      loginModal.onOpen();
                      return;
                    }

                    router.push("/favorites");
                  }}
                  icon={MdFavorite}
                />
                <MenuItem
                  label="Roommates"
                  onClick={() => {
                    if (!user) {
                      loginModal.onOpen();
                      return;
                    }

                    router.push("/roommates");
                  }}
                  icon={FaUserFriends}
                />
                <MenuItem
                  label="Privacy Policy"
                  onClick={() => {
                    router.push("/policy");
                  }}
                  icon={MdPrivacyTip}
                />
                <MenuItem
                  label="Settings"
                  onClick={() => {
                    router.push("/settings");
                  }}
                  icon={IoMdSettings}
                />
                <MenuItem
                  label="Log out"
                  onClick={() => {
                    signOut();
                  }}
                  borderTop
                  icon={BiLogOut}
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
