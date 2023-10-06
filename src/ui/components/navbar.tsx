import { RiZzzFill } from "react-icons/ri";
import { IconInput } from "zstream/ui/primitives/input";
import { BiSearch } from "react-icons/bi";

interface NavbarProps {
  children?: JSX.Element;
}

const navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="fixed h-14 z-50 w-full border border-gray-200 bg-white shadow-sm lg:overflow-y-visible">
      <div className="mx-auto flex max-w-full lg:px-16 xl:grid xl:grid-cols-12">
        <div className="flex items-center gap-2 flex-shrink-0 lg:static xl:col-span-2">
          <RiZzzFill className="h-8 w-8" />
          <span className="text-xl font-semibold">ZStream</span>
        </div>
        <div className="flex-1 lg:px-0 xl:col-span-8">
          <IconInput icon={<BiSearch className="w-5 h-5 text-slate-400" />} placeholder="Search"/>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
 