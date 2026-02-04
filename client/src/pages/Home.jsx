import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const location = useLocation();

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const stats = [
    { number: '20+', label: 'Menu Variants' },
    { number: '4+', label: 'Years Experience' },
    { number: '50+', label: 'Outlet' },
    { number: '10K+', label: 'Happy Customers' }
  ];

  const benefits = [
    {
      icon: '🍜',
      title: 'Authentic Recipe',
      desc: 'Resep rahasia yang telah diwariskan turun temurun'
    },
    {
      icon: '⚡',
      title: 'Fast Service',
      desc: 'Penyajian cepat tanpa mengurangi kualitas'
    },
    {
      icon: '💰',
      title: 'Affordable Price',
      desc: 'Harga terjangkau untuk semua kalangan'
    },
    {
      icon: '🎯',
      title: 'Quality Guarantee',
      desc: 'Jaminan bahan baku premium dan berkualitas'
    }
  ];

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then(res => res.json())
      .then(data => setGallery(data))
      .catch(err => console.error("Gagal fetch gallery:", err));
  }, []);


  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Ganti url ini ke endpoint API kamu
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/artikel")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Gagal fetch artikel:", err));
  }, []);

  const [partners, setPartners] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/partners")
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error("Gagal ambil partners:", err));
  }, []);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then((res) => res.json())
      .then(setProducts) // 🔥 INI SEKARANG VALID
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const [formKontak, setFormKontak] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleSubmitKontak = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formKontak),
    });

    alert("Pesan berhasil dikirim!");
    setFormKontak({ nama: "", email: "", pesan: "" });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-rose-900 to-gray-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                PT Wizzmie Boga Abadi
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                Find Your
                <br />
                <span className="text-yellow-300">Dream Taste</span>
              </h1>

              <p className="text-xl text-white/90 max-w-lg">
                Rasakan pengalaman makan mie pedas yang tak terlupakan dengan
                cita rasa khas dan harga yang ramah di kantong.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['Pedas Level 1-10', 'Halal Certified', 'Fresh Ingredients', 'Fast Service'].map((tag, i) => (
                  <span key={i} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/wizzmie.jpg"
                    alt="Menu Ramen"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-rose-900 px-6 py-3 rounded-2xl font-bold shadow-xl transform rotate-6">
                  100% Halal
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* PROFILE PERUSAHAAN - ENHANCED */}
      <section id="profile" className="py-20 px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #e11d48 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">About Company</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">Profil Perusahaan</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mxAbadi-auto mb-8"></div>
          </div>

          {/* Main Grid - Company Profile */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">

            {/* Left Column - Company Description */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-10 shadow-xl border-l-8 border-rose-600 relative">
              <div className="absolute top-8 right-8 text-8xl opacity-10"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
                <span className="font-bold text-rose-600 text-2xl">PT Wizzmie Boga Abadi</span> PT. Dapur Boga Lestari sebagai Wizzmie Restaurant adalah restaurant cepat saji yang manyajikan mie dan menu terbaik di Indonesia
                dengan harga terjangkau. Wizzmie Restaurant berdiri sejak tahun 2022 tepatnya pada tanggal 2 Maret 2022 di Surabaya, Indonesia.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                Produk utamanya adalah Mie Pedas yang memiliki cita rasa Asia dengan produk unggulannya adalah Mie Goyang, Mie Disko, dan Mie Manja,
                serta menu pendukung lainnya yaitu Dimsum dan Sushi yang dikemas dengan konsep modern.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                  <div className="text-4xl mb-1"></div>
                  <div className="text-xl font-black text-rose-600">Top Brand</div>
                  <div className="text-xs text-gray-600">Kuliner Mie Pedas</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                  <div className="text-4xl mb-1"></div>
                  <div className="text-xl font-black text-rose-600">Certified</div>
                  <div className="text-xs text-gray-600">BPOM & Halal MUI</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                  <div className="text-4xl mb-1"></div>
                  <div className="text-xl font-black text-rose-600">Excellence</div>
                  <div className="text-xs text-gray-600">Service Quality</div>
                </div>
              </div>
            </div>

            {/* Right Column - Pengalaman & Kelebihan Perusahaan */}
            <div className="space-y-6">

              {/* Pengalaman Perusahaan */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-xl border-l-8 border-blue-600">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-black text-gray-900">Pengalaman </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-700">Hingga saat ini Wizzmie sudah memulai pengembangannya di luar kota
                      Surabaya, antara lain Sidoarjo, Mojokerto, Malang, Provinsi Jawa Timur, Jawa Tengah, Jawa Barat,
                      Bali, Sulawesi, Sumatra, and kota – kota lainnya.</span>
                  </li>
                </ul>
              </div>

              {/* Kelebihan Perusahaan */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-l-8 border-purple-600">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-black text-gray-900">Perkembangan </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-700"><strong>Restoran Wizzmie</strong> pertama kali buka di Surabaya pada tanggal 24 Juli 2022 dijalan Jemursari.
                      Hingga saat ini PT. Wizzmie Boga Abadi masih membuka peluang kemitraan di seluruh pelosok lndonesia.
                      PT. Wizzmie Boga Abadi melalui Wizzmie lndonesia berkomitmen menyajikan makanan dan minuman terbaik dan berkualitas dengan harga terjangkau,
                      disertai pelayanan yang ramah bagi pelanggan, dan dapat memberikan kontribusi yang berarti bagi masyarakat di lndonesia.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-6 lg:px-16 bg-gradient-to-r from-rose-600 to-orange-500">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                <div className="text-5xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">01</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">
              Why Choose <span className="text-rose-600">Us?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan keunggulan yang membuat Mie Wizzmie menjadi pilihan utama para pecinta kuliner pedas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-b-4 border-transparent hover:border-rose-600">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section id="visimisi" className="py-20 px-6 lg:px-16 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visi */}
            <div className="space-y-6">
              <div className="inline-block bg-rose-600 px-4 py-2 rounded-full text-sm font-bold">
                OUR VISION
              </div>
              <h2 className="text-5xl font-black">Visi Kami</h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <p className="text-xl leading-relaxed">
                  Menjadi <span className="text-yellow-400 font-bold">pemimpin pasar</span> dalam industri kuliner mi pedas dengan ekspansi jaringan yang masif
                  (lebih dari 50 cabang) di seluruh Indonesia.
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="space-y-6">
              <div className="inline-block bg-orange-500 px-4 py-2 rounded-full text-sm font-bold">
                OUR MISSION
              </div>
              <h2 className="text-5xl font-black">Misi Kami</h2>
              <div className="space-y-4">
                {[
                  'Menghadirkan produk kuliner mi yang inovatif dengan berbagai varian tingkat kepedasan.',
                  'Memberikan pengalaman bersantap yang cepat, modern, dan kreatif, khususnya bagi generasi muda.',
                  'Berinovasi terus-menerus dalam menu dan pelayanan untuk kepuasan pelanggan',
                  'Menerapkan strategi pemasaran yang unik dan viral untuk memperkuat brand identity.'
                ].map((mission, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                    <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-white/90">{mission}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About PERUSAHAAN */}
      <section id="about" className="py-20 px-6 lg:px-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">02</span>
              <h2 className="text-5xl font-black text-gray-900">
                Tentang <span className="text-rose-600">Kami</span>
              </h2>
              <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full"></div>

              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold text-rose-600">Mie Wizzmie</span> merupakan brand kuliner
                yang dikenal dengan konsep mie pedas modern, menyasar generasi muda dengan suasana
                outlet yang santai dan kekinian.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Berada di bawah naungan <span className="font-bold">PT Wizzmie Boga Abadi</span>, kami
                telah melayani ribuan pelanggan setia dengan menghadirkan menu-menu inovatif yang
                memadukan kelezatan tradisional dengan sentuhan modern.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-6 border-l-4 border-rose-600">
                  <div className="text-3xl font-black text-rose-600 mb-1">100%</div>
                  <div className="text-gray-700 font-medium">Halal Certified</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
                  <div className="text-3xl font-black text-blue-600 mb-1">24/7</div>
                  <div className="text-gray-700 font-medium">Customer Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-400 to-orange-400 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-rose-600 to-orange-500 rounded-3xl p-12">
                <div className="aspect-square bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-9xl border border-white/20">

                </div>
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-rose-900 px-8 py-4 rounded-2xl font-black shadow-2xl text-xl">
                  Since 2012
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="produk"
        className="py-20 px-6 lg:px-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-rose-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
              Our Menu
            </span>
            <h2 className="text-5xl font-black mt-2 mb-6">
              Produk{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                Unggulan
              </span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mx-auto mb-8"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Nikmati berbagai varian mie pedas dengan tingkat kepedasan yang bisa disesuaikan dengan seleramu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:-translate-y-2 shadow-2xl">

                  {/* IMAGE */}
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.nama_produk}
                      className="w-full h-40 object-cover rounded-xl mb-6"
                    />
                  )}

                  <h3 className="text-2xl font-black text-white mb-3 text-center">
                    {product.nama_produk}
                  </h3>

                  <p className="text-gray-300 text-center mb-6">
                    {product.deskripsi}
                  </p>

                  <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                    <div className="text-yellow-400 font-black text-2xl">
                      Rp {Number(product.harga).toLocaleString("id-ID")}
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-gradient-to-r from-rose-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:from-rose-700 hover:to-orange-700 transition-all hover:scale-105 shadow-lg">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* GALERI SECTION */}
      <section id="galeri" className="py-24 px-6 lg:px-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
        linear-gradient(to right, #f97316 1px, transparent 1px),
        linear-gradient(to bottom, #f97316 1px, transparent 1px)
      `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Decorative Blurs */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-rose-600 font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-rose-100 to-orange-100 px-6 py-3 rounded-full border-2 border-rose-200/50">
                Gallery
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mt-4 mb-8 leading-tight">
              Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500">Kami</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1.5 w-16 bg-gradient-to-r from-transparent via-rose-400 to-rose-600 rounded-full"></div>
              <div className="h-3 w-3 bg-rose-600 rounded-full"></div>
              <div className="h-1.5 w-16 bg-gradient-to-r from-rose-600 via-orange-400 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Gallery Grid - Show only first 4 items initially */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {gallery.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 aspect-square"
              >
                {/* Image */}
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-rose-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Category Badge */}
                  <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="inline-block bg-gradient-to-r from-rose-600 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.kategori || 'Gallery'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-black text-white text-xl mb-2 drop-shadow-lg">
                    {item.judul}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/90 font-medium drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    {item.keterangan}
                  </p>
                </div>
                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-rose-600 to-orange-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* "Lihat Semua" Button - Only show if gallery has more than 4 items */}
          {gallery.length > 4 && (
            <div className="text-center">
              <button className="group relative inline-flex items-center justify-center bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <span className="relative z-10">Lihat Semua Galeri</span>

                {/* Hover Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          )}

        </div>
      </section>


      {/* PARTNERS SECTION */}
      <section id="partners" className="py-24 px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
        linear-gradient(to right, #f97316 1px, transparent 1px),
        linear-gradient(to bottom, #f97316 1px, transparent 1px)
      `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-50/30 via-transparent to-orange-50/30"></div>

        {/* Decorative Shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-3xl rotate-12 blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-rose-500/10 rounded-3xl -rotate-12 blur-2xl"></div>

        <div className="container mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-rose-600 font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-rose-100 to-orange-100 px-6 py-3 rounded-full border-2 border-rose-200/50">
                Our Partners
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mt-4 mb-8 leading-tight">
              Trusted By{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 animate-gradient">
                Industry Leaders
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1.5 w-16 bg-gradient-to-r from-transparent via-rose-400 to-rose-600 rounded-full"></div>
              <div className="h-3 w-3 bg-rose-600 rounded-full"></div>
              <div className="h-1.5 w-16 bg-gradient-to-r from-rose-600 via-orange-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl font-medium">
              Collaborating with world-class organizations to deliver exceptional results
            </p>
          </div>

          {/* Partners Grid - LARGER CARDS */}
          <div className="flex justify-center mb-20 w-full">
            <div className="grid grid-cols-[repeat(auto-fit,14rem)] justify-center gap-8 max-w-6xl mx-auto">

              {partners.map((partner, i) => (
                <div key={i} className="group">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-100 hover:border-rose-300 flex flex-col items-center justify-center h-56 w-56 relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-orange-50 to-rose-50"></div>
                      <div className="absolute inset-0" style={{
                        backgroundImage: `
                    linear-gradient(45deg, #fff 25%, transparent 25%),
                    linear-gradient(-45deg, #fff 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #fff 75%),
                    linear-gradient(-45deg, transparent 75%, #fff 75%)
                  `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                        opacity: 0.1
                      }}></div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    {/* Logo Container */}
                    <div className="h-28 flex items-center justify-center mb-4 relative z-10">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-24 max-w-[180px] object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 drop-shadow-lg"
                      />
                    </div>

                    {/* Partner Name */}
                    <div className="font-black text-gray-800 text-base text-center relative z-10 group-hover:text-rose-600 transition-colors duration-300">
                      {partner.name}
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-rose-500/20 via-orange-500/10 to-transparent rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-500/20 via-rose-500/10 to-transparent rounded-tr-[100%] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Top Line Accent */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-rose-600 to-orange-500 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARTIKEL - ENHANCED */}
      <section id="artikel" className="py-20 px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg, #e11d48 25%, transparent 25%, transparent 75%, #e11d48 75%, #e11d48), linear-gradient(45deg, #e11d48 25%, transparent 25%, transparent 75%, #e11d48 75%, #e11d48)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Latest News</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">
              Artikel & <span className="text-rose-600">Berita</span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="group bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">

                {/* Image */}
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    📅 {new Date(article.created_at).toLocaleDateString()}
                  </div>

                  <h3 className="font-black text-xl text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                    {article.judul}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {article.isi}
                  </p>

                  <a
                    href={article.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-rose-600 font-bold hover:gap-4 transition-all"
                  >
                    Baca Selengkapnya →
                  </a>

                </div>
              </div>
            ))}

          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:from-rose-700 hover:to-orange-700 transition-all hover:scale-105 shadow-xl">
              Lihat Semua Artikel
            </button>
          </div>
        </div>
      </section>

      {/* Section Event */}
      <section
        id="event"
        className="py-20 px-6 lg:px-16 bg-gradient-to-br from-gray-900 via-rose-900 to-gray-900 text-white relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-rose-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
              What's Happening
            </span>
            <h2 className="text-5xl font-black mt-2 mb-6">
              Event &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Promo
              </span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.length === 0 ? (
              <p className="text-center text-white">Loading events...</p>
            ) : (
              events.map((event, i) => (
                <div key={event.id} className="group relative">
                  {/* Card */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:-translate-y-2 shadow-2xl h-full flex flex-col">
                    {/* Gambar */}
                    {event.gambar && (
                      <img
                        src={event.gambar}
                        alt={event.judul}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}

                    {/* Judul */}
                    <h3 className="text-2xl font-black mb-3">{event.judul}</h3>

                    {/* Tanggal dan Lokasi */}
                    <div className="flex items-center gap-4 text-yellow-400 mb-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">
                          {new Date(event.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{event.lokasi}</span>
                      </div>
                    </div>

                    {/* Deskripsi */}
                    <p className="text-white/80 leading-relaxed mb-6 flex-grow">{event.deskripsi}</p>

                    {/* Tombol Link */}
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all hover:scale-105 shadow-lg text-center"
                      >
                        Info Selengkapnya
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* KONTAK */}
      <section id="kontak" className="py-20 px-6 lg:px-16 bg-gradient-to-br from-gray-900 via-rose-900 to-gray-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="text-yellow-300 font-bold text-sm uppercase tracking-wider">05</span>
                <h2 className="text-5xl font-black mt-2 mb-4">
                  Contact Us
                </h2>
                <p className="text-xl text-white/90">
                  Hubungi kami untuk informasi lebih lanjut atau kunjungi outlet terdekat
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    //
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Email</div>
                    <div className="font-bold">info@mie-wizzmie.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    //
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Instagram</div>
                    <div className="font-bold">@mie.wizzmie</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    //
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Phone</div>
                    <div className="font-bold">+62 812-3456-7890</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    //
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Address</div>
                    <div className="font-bold">Jl. Kuliner Raya No. 123, Jakarta</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Hubungi Kami</h3>
              <form className="space-y-4" onSubmit={handleSubmitKontak}>
                <div>
                  <label className="block text-sm mb-2">Nama</label>
                  <input
                    value={formKontak.nama}
                    onChange={(e) => setFormKontak({ ...formKontak, nama: e.target.value })}
                    type="text"
                    placeholder="Nama lengkap kamu"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    value={formKontak.email}
                    onChange={(e) => setFormKontak({ ...formKontak, email: e.target.value })}
                    type="email"
                    placeholder="emailkamu@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Pesan</label>
                  <textarea
                    value={formKontak.pesan}
                    onChange={(e) => setFormKontak({ ...formKontak, pesan: e.target.value })}
                    rows="4"
                    placeholder="Tulis pesan kamu di sini..."
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white transition-colors resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-white text-rose-600 py-4 rounded-xl font-bold hover:bg-yellow-300 hover:text-rose-700 transition-all hover:scale-105 shadow-xl">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 px-6 lg:px-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                Mie Wizzmie
              </h3>
              <p className="text-gray-400 mb-4">
                Brand kuliner pilihan dengan cita rasa khas dan harga terjangkau.
              </p>
              <div className="flex gap-3">
                {['facebook', 'instagram', 'twitter'].map((social, i) => (
                  <button key={i} className="w-10 h-10 bg-white/10 rounded-full hover:bg-rose-600 transition-colors flex items-center justify-center">
                    <span className="text-lg">
                      {social === 'facebook' && '📘'}
                      {social === 'instagram' && '📷'}
                      {social === 'twitter' && '🐦'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Menu</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mie Pedas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mie Original</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mie Special</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beverages</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>info@mie-wizzmie.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>@mie.wizzmie</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+62 812-3456-7890</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Mie Wizzmie - PT Wizzmie Boga Abadi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}