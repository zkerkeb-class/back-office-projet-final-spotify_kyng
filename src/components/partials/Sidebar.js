import { MicVocal,Disc, LayoutDashboard, Settings, House } from "lucide-react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-gray-500">
      <nav className=" h-full flex flex-col justify-between">
        <ul className="border-b border-gray-500">
          <li>
            <Link href="#" className="flex items-center gap-2 p-4">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 p-4">
              <House size={16} />
              Catalogue
            </Link>
          </li>
            <li>
                <Link href="#" className="flex items-center gap-2 p-4">
                <MicVocal size={16} />
                Artists
                </Link>
            </li>
            <li>
                <Link href="#" className="flex items-center gap-2 p-4">
                <Disc size={16} />
                Titres
                </Link>
            </li>
        </ul>
        <ul className="border-t border-gray-500">
            <li>
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
