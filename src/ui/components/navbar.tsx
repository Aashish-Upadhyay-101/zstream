import React, { useState } from "react";
import { IconInput } from "zstream/ui/primitives/input";
import { RiZzzFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

interface NavbarProps {
  children?: JSX.Element;
}

export default function Navbar({ children }: NavbarProps) {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = () => {};

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("YOu pressed Enter");
      handleSearch();
    }
  };

  return (
    <nav className="fixed z-50 w-full border border-gray-200 bg-white shadow-sm lg:overflow-y-visible">
      <div className="mx-auto flex max-w-full lg:px-16 xl:grid xl:grid-cols-12">
        <div className="flex flex-shrink-0 items-center gap-2 lg:static xl:col-span-2">
          <RiZzzFill className="h-8 w-8" />
          <span className="text-xl font-semibold">ZStream</span>
        </div>
        <div className="flex-1 lg:px-0 xl:col-span-8">
          <div className="flex items-center px-6 py-4">
            <IconInput
              icon={<BiSearch className="h-5 w-5 text-slate-400" />}
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDownSearch(e)
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
