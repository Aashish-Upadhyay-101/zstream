import { BiHomeAlt2, BiVideo, BiHistory, BiLike } from "react-icons/bi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface NavigationItem {
  name: string;
  path: string;
  icon: (className: string) => JSX.Element;
  current: boolean;
}

export default function Sidebar() {
  const router = useRouter();

  const [collapse, setCollapse] = useState<boolean>(false);

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

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setCollapse(true);
    }
  }, []);

  return (
    <div
      className={`h-screen w-16 shrink-0 border-r duration-300 ${
        collapse ? "lg:w-[72px]" : "lg:w-60"
      }`}
    >
      <div className="h-full px-4 py-8">
        <div className="flex h-[90%] flex-col justify-between">
          <ul className="space-y-3">
            {SidebarNavigationItems.map((item: NavigationItem, index) => (
              <li
                key={index}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-2 rounded-md p-2 ${
                  item.current && "bg-primary/20"
                } duration-150 hover:cursor-pointer hover:bg-primary/20`}
              >
                {item.icon("h-5 w-5")} {!collapse && item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
