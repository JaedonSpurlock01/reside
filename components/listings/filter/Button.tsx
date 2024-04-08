import useFilterModal from "@/hooks/useFilterModal";
import React, { useCallback, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Button({ className }: { className: string }) {
  const filterModal = useFilterModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      filterModal.onClose();
    } else {
      filterModal.onOpen();
    }

    setIsOpen((value) => !value);
  }, []);

  return (
    <button className={className} onClick={toggleOpen}>
      <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-row items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="fill-none block h-[16px] w-[16px] stroke-white stroke-[3px] overflow-visible"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path
            fill="none"
            d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3"
          ></path>
        </svg>{" "}
        Filters
      </h1>

      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {true ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </span>
    </button>
  );
}
