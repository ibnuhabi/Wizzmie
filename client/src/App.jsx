import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Produk from "./pages/Produk";
import Artikel from "./pages/Artikel";
import Event from "./pages/Event";
import Galeri from "./pages/Galeri";
import Login from "./pages/Login";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/event" element={<Event />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}