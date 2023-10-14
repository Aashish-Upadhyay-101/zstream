import { IoSettingsOutline } from "react-icons/io5";
import {
  BiHelpCircle,
  BiHomeAlt2,
  BiVideo,
  BiHistory,
  BiLike,
} from "react-icons/bi";
import { useRouter } from "next/router";

interface NavigationItem {
  name: string;
  path: string;
  icon: (className: string) => JSX.Element;
  current: boolean;
}

export default function Sidebar() {
  const router = useRouter();

  const SidebarNavigationItems: NavigationItem[] = [
    {
      name: "Home",
      icon: (className) => <BiHomeAlt2 className={className} />,
      path: "/",
      current: router.pathname === "/",
    },
    {
      name: "Your Videos",
      icon: (className) => <BiVideo className={className} />,
      path: "/your-videos",
      current: router.pathname === "/your-videos",
    },
    {
      name: "History",
      icon: (className) => <BiHistory className={className} />,
      path: "/history",
      current: router.pathname === "/history",
    },
    {
      name: "Liked Videos",
      icon: (className) => <BiLike className={className} />,
      path: "/liked-videos",
      current: router.pathname === "/liked-videos",
    },
  ];

  return (
    <div className="h-screen shrink-0 border-r lg:w-60">
      <div className="h-full px-4 py-8">
        <div className="flex h-[90%] flex-col justify-between">
          <ul className="space-y-3">
            {SidebarNavigationItems.map((item: NavigationItem) => (
              <li
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-2 rounded-md p-2 ${
                  item.current && "bg-primary/20"
                } duration-150 hover:cursor-pointer hover:bg-primary/20`}
              >
                {item.icon("h-5 w-5")} {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
