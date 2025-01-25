import React, { useState } from "react";
import { NavigationProvider } from "./context/NavigationContext";
import Sidebar from "./components/Sidebar";
import UserNav from "./components/UserNav";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <NavigationProvider>
      <div className="flex h-dvh">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between bg-white border-b px-4 py-2 shadow-sm">
            <button
              className="lg:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <UserNav />
          </header>
          <main className="flex-1 bg-gray-50 p-4 w-full overflow-y-scroll ">
              <Dashboard/>
          </main>
        </div>
      </div>
    </NavigationProvider>
  );
}