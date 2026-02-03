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

  const products = [
    {
      name: 'Mie Pedas Original',
      desc: 'Menu klasik dengan tingkat kepedasan level 1-5',
      price: 'Mulai dari Rp 15.000',
      icon: '🍜',
      badge: 'Best Seller',
      color: 'from-rose-500 to-pink-500'
    },
    {
      name: 'Mie Pedas Level 10',
      desc: 'Tantangan untuk pecinta pedas sejati',
      price: 'Mulai dari Rp 20.000',
      icon: '🔥',
      badge: 'Hot Choice',
      color: 'from-orange-500 to-red-600'
    },
    {
      name: 'Mie Special Wizzmie',
      desc: 'Menu spesial dengan topping premium lengkap',
      price: 'Mulai dari Rp 25.000',
      icon: '⭐',
      badge: 'Premium',
      color: 'from-yellow-500 to-orange-500'
    }
  ];


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


    useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
    <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #e11d48 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
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
               style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
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

      {/* PRODUK - ENHANCED */}
      <section id="produk" className="py-20 px-6 lg:px-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-rose-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Our Menu</span>
            <h2 className="text-5xl font-black mt-2 mb-6">
              Produk <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Unggulan</span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mx-auto mb-8"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Nikmati berbagai varian mie pedas dengan tingkat kepedasan yang bisa disesuaikan dengan seleramu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div key={i} className="group relative">
                {/* Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:-translate-y-2 shadow-2xl">
                  {/* Badge */}
                  <div className={`absolute -top-4 -right-4 bg-gradient-to-r ${product.color} text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl transform rotate-6 group-hover:rotate-12 transition-transform`}>
                    {product.badge}
                  </div>

                  {/* Icon */}
                  <div className="text-7xl mb-6 text-center group-hover:scale-110 transition-transform">
                    {product.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-white mb-3 text-center">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-center mb-6">
                    {product.desc}
                  </p>

                  {/* Price */}
                  <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                    <div className="text-yellow-400 font-black text-2xl">
                      {product.price}
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full mt-6 bg-gradient-to-r from-rose-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:from-rose-700 hover:to-orange-700 transition-all hover:scale-105 shadow-lg">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-4xl mb-3">🌶️</div>
              <div className="font-bold text-lg mb-2">Level Pedas Custom</div>
              <div className="text-sm text-gray-400">Pilih tingkat kepedasan 1-10 sesuai selera</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-4xl mb-3">🥚</div>
              <div className="font-bold text-lg mb-2">Topping Beragam</div>
              <div className="text-sm text-gray-400">Tambahan telur, ayam, bakso, dan lainnya</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-4xl mb-3">🥤</div>
              <div className="font-bold text-lg mb-2">Paket Combo</div>
              <div className="text-sm text-gray-400">Hemat dengan paket mie + minuman</div>
            </div>
          </div>
        </div>
      </section>

    
      {/* GALERI - NEW SECTION */}
      <section id="galeri" className="py-20 px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Gallery</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">
              Galeri <span className="text-rose-600">Kami</span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Lihat momen-momen terbaik dari outlet, menu, dan kegiatan Mie Wizzmie
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Large Featured Image */}
            <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-square bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                🍜
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Mie Pedas Signature</h3>
                  <p className="text-sm text-white/90">Menu andalan kami dengan level pedas custom</p>
                </div>
              </div>
            </div>

            {/* Small Images */}
            {[
              { icon: '🔥', title: 'Level 10 Challenge', desc: 'Berani coba?' },
              { icon: '🏪', title: 'Outlet Modern', desc: 'Suasana nyaman' },
              { icon: '👨‍🍳', title: 'Chef Profesional', desc: 'Tim berpengalaman' },
              { icon: '🥚', title: 'Topping Premium', desc: 'Pilihan lengkap' },
              { icon: '🎉', title: 'Event & Promo', desc: 'Seru setiap hari' },
              { icon: '😋', title: 'Happy Customers', desc: 'Pelanggan puas' },
              { icon: '🍲', title: 'Fresh Ingredients', desc: 'Bahan berkualitas' },
              { icon: '⭐', title: 'Best Seller', desc: 'Menu favorit' }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-xs text-white/90">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Medium Featured Image */}
            <div className="col-span-2 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-video bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                🎊
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Grand Opening Events</h3>
                  <p className="text-sm text-white/90">Momen pembukaan outlet baru kami</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Instagram CTA */}
          <div className="mt-16 bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-12 text-center border-l-8 border-rose-600">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Follow Our Instagram!
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Dapatkan update foto terbaru, promo eksklusif, dan konten menarik lainnya di Instagram kami
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-xl font-bold hover:from-pink-600 hover:to-rose-700 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2">
              <span>📱</span>
              Follow @mie.wizzmie
            </button>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section id="partners" className="py-20 px-6 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Our Partners</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">
              Trusted By <span className="text-rose-600">Industry Leaders</span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mx-auto mb-8"></div>
          </div>

          {/* Partners Grid */}
          <div className="flex justify-center mb-16">
  <div className="flex gap-6">
    {partners.map((partner, i) => (
  <div key={i} className="group">
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 flex flex-col items-center justify-center h-36 w-36">
      <div className="h-20 flex items-center justify-center mb-3">
  <img
    src={partner.logo}
    alt={partner.name}
    className="max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
  />
</div>
      <div className="font-bold text-gray-900 text-sm text-center">
        {partner.name}
      </div>
    </div>
  </div>
))}

  </div>
</div>
       
          {/* CTA for Partnership */}
          <div className="mt-16 bg-gradient-to-r from-rose-600 to-orange-500 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-black mb-4">Tertarik Menjadi Partner Kami?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Bergabunglah dengan jaringan mitra Wizzmie dan kembangkan bisnis Anda bersama kami
            </p>
            <button className="bg-white text-rose-600 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 hover:text-rose-700 transition-all hover:scale-105 shadow-xl">
              Hubungi Partnership Team
            </button>
          </div>
        </div>
      </section>

      {/* ARTIKEL - ENHANCED */}
      <section id="artikel" className="py-20 px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, #e11d48 25%, transparent 25%, transparent 75%, #e11d48 75%, #e11d48), linear-gradient(45deg, #e11d48 25%, transparent 25%, transparent 75%, #e11d48 75%, #e11d48)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Latest News</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">
              Artikel & <span className="text-rose-600">Berita</span>
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Update terbaru seputar Wizzmie, tips kuliner, dan berbagai kegiatan menarik kami
            </p>
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
                  <span>📅</span>
                  <span className="font-bold">
                    {new Date(event.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📍</span>
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
      <section id="kontak" className="py-20 px-6 lg:px-16 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
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
                  Ready to Find Your Perfect Taste?
                </h2>
                <p className="text-xl text-white/90">
                  Hubungi kami untuk informasi lebih lanjut atau kunjungi outlet terdekat
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Email</div>
                    <div className="font-bold">info@mie-wizzmie.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Instagram</div>
                    <div className="font-bold">@mie.wizzmie</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Phone</div>
                    <div className="font-bold">+62 812-3456-7890</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="bg-white text-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Address</div>
                    <div className="font-bold">Jl. Kuliner Raya No. 123, Jakarta</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Sign up for our newsletter</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white transition-colors"
                  />
                </div>
                <button className="w-full bg-white text-rose-600 py-4 rounded-xl font-bold hover:bg-yellow-300 hover:text-rose-700 transition-all hover:scale-105 shadow-xl">
                  Subscribe Now
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