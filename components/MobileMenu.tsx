import React from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";
import { SiSteelseries } from "react-icons/si";
import { FaFilm } from "react-icons/fa";

type MobileMenuProps = {
  visible: any;
};
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="absolute top-8 w-48 flex-col border-gray-500 border-2 rounded-md py-5 px-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <AiTwotoneHome className="mt-1" />
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </div>
        <hr className="border border-gray-500" />
        <div className="flex flex-row gap-2">
          <SiSteelseries className="mt-1" />
          <Link href="/" className="text-white hover:text-gray-300">
            Series
          </Link>
        </div>
        <hr className="border border-gray-500" />
        <div className="flex flex-row gap-2">
          <FaFilm className="mt-1" />
          <Link href="/" className="text-white hover:text-gray-300">
            Films
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
