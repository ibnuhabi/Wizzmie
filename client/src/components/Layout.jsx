import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsOpen(true)} />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* 👇 INI WAJIB ADA */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
