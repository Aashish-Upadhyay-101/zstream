import { RiZzzFill } from "react-icons/ri";

interface NavbarProps {
  children?: JSX.Element;
}

const navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="fixed z-50 w-full border border-gray-200 bg-white shadow-sm lg:overflow-y-visible">
      <div className="mx-auto flex max-w-full lg:px-16 xl:grid xl:grid-cols-12">
        <div className="flex items-center gap-2 flex-shrink-0 lg:static xl:col-span-2">
          <RiZzzFill className="h-8 w-8" />
          <span className="text-xl font-semibold">ZStream</span>
        </div>
        <div className="flex-1 lg:px-0 xl:col-span-8">
          <input />
        </div>
      </div>
    </nav>
  );
};

export default navbar;
 