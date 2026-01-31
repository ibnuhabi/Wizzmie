import { Link } from "react-router-dom";
import logo from "../assets/maskot-wizzmie.png";

export default function Header({ onMenuClick }) {

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-2xl"
            aria-label="Open Menu"
          >
            ☰
          </button>

          <img src={logo} alt="Mie Gacoan" className="h-14" />
          <h1 className="text-xl font-bold text-[#EC008C]">
            PT Wizzmie Boga Abadi
          </h1>
        </div>

        <nav className="flex gap-6 font-medium text-gray-700">
  <button onClick={() => scrollToSection("home")} className="hover:text-[#EC008C]">
    Home
  </button>

  <button onClick={() => scrollToSection("profile")} className="hover:text-[#EC008C]">
    Profile
  </button>

  <button onClick={() => scrollToSection("visimisi")} className="hover:text-[#EC008C]">
    Visi & Misi
  </button>

  <button onClick={() => scrollToSection("about")} className="hover:text-[#EC008C]">
    About
  </button>

  <button onClick={() => scrollToSection("produk")} className="hover:text-[#EC008C]">
    Produk
  </button>

  <button onClick={() => scrollToSection("kontak")} className="hover:text-[#EC008C]">
    Kontak
  </button>

  
</nav>
      </div>
    </header>
  );
}