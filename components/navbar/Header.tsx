"use client";

import Search from "../Search";
import Logo from "../Logo";
import UserMenu from "./UserMenu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePathname } from "next/navigation";

export default function Header() {
  const user = useCurrentUser();
  const pathname = usePathname();

  return (
    <div className="bg-[#262626] w-full border-b-[1px] border-[#373737] h-[6rem] py-4 px-16 flex items-center justify-center z-20">
      <div className="w-full h-full relative font-light text-white">
        <div className="absolute sm:left-1/2 sm:top-1/2 tracking-wider font-semibold transform sm:-translate-x-1/2 sm:-translate-y-1/2">
          <a href="/">
            <Logo />
          </a>
        </div>

        <div className="absolute left-0 top-1/2 text-lg transform -translate-y-1/2 flex-row space-x-8 items-center z-20 hidden sm:flex">
          <Search className="relative border w-72 rounded-lg flex items-center" />
        </div>

        {!pathname.includes("/auth") && (
          <div className="absolute right-0 top-1/2 text-lg transform -translate-y-1/2 flex flex-row space-x-8 z-20">
            <UserMenu user={user} />
          </div>
        )}
      </div>
    </div>
  );
}
