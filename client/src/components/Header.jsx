import { Link } from "react-router-dom";
import logo from "../assets/maskot-wizzmie.png";

export default function Header({ onMenuClick }) {
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
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/produk">Produk</Link>
          <Link to="/visimisi">Visi & Misi</Link>
          <Link to="/kontak">Kontak</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}