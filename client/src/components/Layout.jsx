import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onMenuClick={() => setOpen(true)} />
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

<main className="w-full px-0 py-0">
  {children}
</main>

    </div>
  );
}