import Filter from "@/components/svg/Filter";
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
        <Filter /> Filters
      </h1>

      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {true ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </span>
    </button>
  );
}
