import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Produk from "./pages/Produk";
import Artikel from "./pages/Artikel";
import Event from "./pages/Event";
import Galeri from "./pages/Galeri";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Partners from "./pages/Partners";

export default function App() {
  return (
    <Routes>
      {/* ===== CLIENT (PAKAI LAYOUT) ===== */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* ===== ADMIN (TANPA LAYOUT) ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<Produk />} />
      <Route path="/admin/gallery" element={<Galeri />} />
      <Route path="/admin/partners" element={<Partners />} />
      <Route path="/admin/event" element={<Event />} />
      <Route path="/admin/articles" element={<Artikel />} />
    </Routes>
  );
}
