import { useState } from 'react';

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null);

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

  const testimonials = [
    {
      name: 'Rina Kusuma',
      role: 'Food Blogger',
      text: 'Mie Wizzmie adalah tempat favorit saya! Rasa pedasnya pas banget dan harganya sangat terjangkau.',
      avatar: '👩'
    },
    {
      name: 'Ahmad Fauzi',
      role: 'Student',
      text: 'Suasana outlet-nya nyaman banget buat nongkrong sambil makan mie pedas. Highly recommended!',
      avatar: '👨'
    },
    {
      name: 'Sarah Dewi',
      role: 'Office Worker',
      text: 'Pelayanannya cepat, rasanya enak, cocok untuk lunch break. Saya sudah jadi pelanggan setia!',
      avatar: '👩‍💼'
    }
  ];

  const faqs = [
    {
      question: 'Dimana saja lokasi outlet Mie Wizzmie?',
      answer: 'Saat ini kami memiliki outlet di berbagai kota besar di Indonesia. Silakan hubungi kami untuk informasi lokasi terdekat.'
    },
    {
      question: 'Apakah tersedia menu non-pedas?',
      answer: 'Ya, kami menyediakan berbagai varian rasa termasuk non-pedas untuk yang tidak suka pedas.'
    },
    {
      question: 'Bagaimana cara menjadi mitra franchise?',
      answer: 'Anda bisa menghubungi tim kami melalui email atau telepon untuk informasi kemitraan franchise.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500">
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

              {/* Search Box */}
              <div className="bg-white rounded-2xl p-3 shadow-2xl max-w-2xl">
                <div className="flex flex-wrap gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                      <span>📍</span>
                      <input 
                        type="text" 
                        placeholder="Location" 
                        className="bg-transparent border-none outline-none w-full text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                      <span>🍜</span>
                      <select className="bg-transparent border-none outline-none w-full text-gray-700">
                        <option>Menu Type</option>
                        <option>Mie Pedas</option>
                        <option>Mie Original</option>
                        <option>Mie Special</option>
                      </select>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-rose-600 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105">
                    Search Menu
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['Pedas Level 1-10', 'Halal Certified', 'Fresh Ingredients', 'Fast Service'].map((tag, i) => (
                  <span key={i} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl flex items-center justify-center text-6xl">
                  🍜
                </div>
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-rose-900 px-6 py-3 rounded-2xl font-bold shadow-xl transform rotate-6">
                  100% Halal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* KATA PENGANTAR */}
      <section className="py-20 px-6 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl p-12 border-l-8 border-rose-600">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">👋</span>
              <h2 className="text-4xl font-black text-gray-900">Selamat Datang</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Selamat datang di <span className="font-bold text-rose-600">Mie Wizzmie</span>, 
              brand kuliner di bawah naungan <span className="font-bold">PT Wizzmie Boga Abadi</span> yang 
              menghadirkan pengalaman makan mie pedas dengan harga terjangkau dan cita rasa khas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kami berkomitmen untuk menyajikan hidangan berkualitas tinggi dengan bahan-bahan pilihan, 
              menciptakan momen kebersamaan yang hangat, dan memberikan pengalaman kuliner yang tak terlupakan 
              untuk setiap pelanggan kami.
            </p>
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
      <section className="py-20 px-6 lg:px-16 bg-gray-900 text-white relative overflow-hidden">
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
                  'Menerapkan strategi pemasaran yang unik dan viral untuk memperkuat brand identity. '
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

      {/* PROFILE PERUSAHAAN */}
      <section className="py-20 px-6 lg:px-16">
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
                  🍜
                </div>
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-rose-900 px-8 py-4 rounded-2xl font-black shadow-2xl text-xl">
                  Since 2012
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">03</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">
              What Our <span className="text-rose-600">Clients Say?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan testimoni dari pelanggan setia kami yang telah merasakan kelezatan Mie Wizzmie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">04</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2">FAQ</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                  </div>
                  <span className="text-2xl text-rose-600 flex-shrink-0">
                    {activeAccordion === index ? '−' : '+'}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="p-6 pt-0 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
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