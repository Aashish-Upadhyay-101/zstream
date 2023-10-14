import React, { useState } from "react";
import { IconInput } from "zstream/ui/primitives/input";
import { RiZzzFill } from "react-icons/ri";
import { BiSearch, BiHelpCircle, BiLogOut } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { SiObsstudio } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "zstream/ui/primitives/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "zstream/ui/primitives/menu";

interface NavbarProps {
  children?: JSX.Element;
}

interface NavigationItem {
  icon: (className: string) => JSX.Element;
  name: string;
  path: string;
  lineAbove: boolean;
}

export default function Navbar({ children }: NavbarProps) {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = () => {};

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("You pressed Enter");
      handleSearch();
    }
  };

  return (
    <nav className="z-50 w-full border border-gray-200 bg-white shadow-sm lg:overflow-y-visible">
      <div className="mx-auto flex max-w-full items-center lg:px-16 xl:grid xl:grid-cols-12">
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
        {!session ? (
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/auth/signin"
              className="rounded-lg border px-3 py-1 text-sm duration-200 hover:bg-secondary"
            >
              login
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-primary/90 px-3 py-1 text-sm text-primary-foreground duration-200 hover:bg-primary"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Menubar className="">
              <MenubarMenu>
                <MenubarTrigger className="">
                  <Avatar>
                    <AvatarImage src="https://github.com/aashish-upadhyay-101.png" />
                    <AvatarFallback>
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem disabled className="flex flex-col items-start">
                    <p>{session.user.name}</p>
                  </MenubarItem>
                  <MenubarItem className="flex items-center gap-2">
                    <BsPerson className="h-5 w-5" /> View Profile
                  </MenubarItem>
                  <MenubarItem className="flex items-center gap-2">
                    <SiObsstudio className="h-5 w-5" /> Creator Studio
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="flex items-center gap-2">
                    <IoSettingsOutline className="h-5 w-5" /> Settings
                  </MenubarItem>
                  <MenubarItem className="flex items-center gap-2">
                    <BiHelpCircle className="h-5 w-5" /> Help
                  </MenubarItem>
                  <MenubarItem className="flex items-center gap-2">
                    <MdOutlineFeedback className="h-5 w-5" /> Feedback
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2"
                  >
                    <BiLogOut className="h-5 w-5" /> Logout
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        )}
        <div className="flex items-center lg:hidden">{children}</div>
      </div>
    </nav>
  );
}
