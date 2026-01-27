import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { icon: "🏠", label: "Home", path: "/" },
    { icon: "👥", label: "Klien Kami", path: "/myclient" },
    { icon: "📰", label: "Artikel", path: "/artikel" },
    { icon: "🎉", label: "Event", path: "/event" },
    { icon: "🖼️", label: "Galeri", path: "/galeri" },
    { icon: "🏢", label: "Cabang", path: "/branches" }
  ];

  const bottomItems = [
    { icon: "❓", label: "Help", path: "/help" },
    { icon: "🚪", label: "Log out", path: "/logout" }
  ];

  const authItems = [
    { icon: "🔐", label: "Login", path: "/login" },
    { icon: "📝", label: "Register", path: "/register" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex gap-2 p-4
        transform transition-all duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Mini Sidebar (Icon Only) */}
        <div className="w-16 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-3 flex flex-col justify-between border border-gray-100">
          {/* Top Section */}
          <div className="space-y-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg">
              MW
            </div>

            <div className="h-px bg-gray-200 my-2"></div>

            {/* Menu Icons */}
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={onClose}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 group
                  ${isActive(item.path) 
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30' 
                    : 'hover:bg-gray-100 text-gray-600'
                  }`}
              >
                <span className={`text-lg transition-transform group-hover:scale-110 ${isActive(item.path) ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="space-y-3">
            <div className="h-px bg-gray-200 my-2"></div>
            
            {bottomItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 group"
              >
                <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
              </Link>
            ))}

            {/* User Avatar */}
            <button className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all">
              <span className="text-sm">👤</span>
            </button>
          </div>
        </div>

        {/* Extended Sidebar (Full Menu) */}
        <div className="w-64 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 flex flex-col justify-between border border-gray-100">
          {/* Top Section */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg">
                  MW
                </div>
                <span className="font-bold text-gray-900 text-lg">Mie Wizzmie</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            {/* Main Menu */}
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20'
                      : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  <span className={`text-xl transition-transform group-hover:scale-110 ${isActive(item.path) ? 'scale-110' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-1">
                {authItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive(item.path)
                        ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20'
                        : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    <span className={`text-xl transition-transform group-hover:scale-110 ${isActive(item.path) ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            <div className="border-t border-gray-200 pt-4 space-y-1 mb-4">
              {bottomItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all duration-200 group"
                >
                  <span className="text-xl transition-transform group-hover:scale-110">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm">Guest User</div>
                  <div className="text-xs text-white/80">guest@wizzmie.com</div>
                </div>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-xl px-3 py-2 border border-white/20 hover:bg-white/20 transition-all"
              >
                <span className="text-lg">{isDarkMode ? '🌙' : '☀️'}</span>
                <span className="text-sm font-medium">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
                <div className="ml-auto">
                  <div className={`w-10 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-white/30' : 'bg-white/30'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${isDarkMode ? 'ml-5' : 'ml-1'}`}></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}