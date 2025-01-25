import React from "react";
import { useNavigation } from "../context/NavigationContext";

const links = [
  { title: "Dashboard", icon: "https://cdn-icons-png.flaticon.com/128/4305/4305638.png" },
  { title: "Study Room", icon: "https://cdn-icons-png.flaticon.com/512/950/950232.png" },
  { title: "Beadroom", icon: "https://cdn-icons-png.flaticon.com/512/452/452811.png" },
  { title: "Kitchen", icon: "https://cdn-icons-png.flaticon.com/512/864/864615.png" },
  { title: "Hall", icon: "https://cdn-icons-png.flaticon.com/512/1347/1347714.png" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { selectedTitle, setSelectedTitle } = useNavigation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0 lg:relative lg:w-64`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <h2 className="text-lg font-bold">MyApp</h2>
        <button
          className="lg:hidden text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
      </div>
      <nav className="flex flex-col h-[calc(100%-4rem)]">
        <ul>
          {links.map((link) => (
            <li 
              key={link.title} 
              className={`py-2 px-4 hover:bg-gray-800 mb-2 cursor-pointer ${
                selectedTitle === link.title ? 'bg-gray-800' : ''
              }`}
              onClick={() => {
                setSelectedTitle(link.title);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              <div className="flex items-center gap-2">
                <span><img src={link.icon} alt="" className="w-6 h-6 invert" /></span>
                {link.title}
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-auto">
          <li className="py-2 px-4 hover:bg-gray-800 mb-4">
            <a href="#" className="flex items-center gap-2">
              <span><img src="https://cdn-icons-png.flaticon.com/512/503/503822.png" className="w-6 h-6 invert"/></span>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
