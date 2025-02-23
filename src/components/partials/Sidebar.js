import { decodeJWT } from "@/utils";
import { MicVocal,Album, LayoutDashboard, Settings, Folder, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const Sidebar = () => {
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const decoded = decodeJWT(token);
    setUserRole(decoded.role);
  }, []);
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
          {userRole === 'artist' ? (
                <li className="hover:bg-gray-100">
                <Link href="/albums" className="flex items-center gap-2 p-4">
                <Album size={16} />
                Albums
                </Link>
            </li>
            ) : (
           <>
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
           </>

            )}
        </ul>
        <ul className="border-t border-gray-500">
           <li className="hover:bg-gray-100">
                <Link href="/api/auth/logout" className="flex items-center gap-2 p-4">
                <LogOut size={16} />
                Déconnexion
                </Link>
            </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
