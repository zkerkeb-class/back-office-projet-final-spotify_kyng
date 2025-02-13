import { MicVocal,Album, LayoutDashboard, Settings, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Sidebar = () => {
  return (
    <aside className=" h-screen border-r border-gray-500">
      <nav className="w-64 gap-40 flex flex-col justify-between">
        <ul className="border-b border-gray-500">
          <li className="p-4 h-12 flex">
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo.svg"
              alt="logo"
              width={32}
              height={32}
            />
            <b>Spotify Portal</b>
          </Link>
          </li>
          <li className="hover:bg-gray-100">
            <Link href="/" className="flex items-center gap-2 p-4">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </li>
           <li className="hover:bg-gray-100">
                <Link href="/artists" className="flex items-center gap-2 p-4">
                <MicVocal size={16} />
                Artistes
                </Link>
            </li>
           <li className="hover:bg-gray-100">
                <Link href="/albums" className="flex items-center gap-2 p-4">
                <Album size={16} />
                Albums
                </Link>
            </li>
        </ul>
        <ul className="border-t border-gray-500">
           <li className="hover:bg-gray-100">
                <Link href="#" className="flex items-center gap-2 p-4">
                <Settings size={16} />
                Paramètres
                </Link>
            </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
