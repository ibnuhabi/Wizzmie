import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    { icon: "🏠", label: "Home", path: "/" },
    { icon: "👥", label: "Partners Kami", path: "/#partners" },
    { icon: "📰", label: "Artikel", path: "/#artikel" },
    { icon: "🎉", label: "Event", path: "/#event" },
    { icon: "🖼️", label: "Galeri", path: "/#galeri" },

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
        className={`fixed top-0 left-0 h-full z-50 p-4
        transform transition-all duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Extended Sidebar (Full Menu) */}
        <div className="w-64 h-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 flex flex-col justify-between border border-gray-100">
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
            <div className="border-t border-gray-200 pt-4 space-y-1">
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
          </div>
        </div>
      </aside>
    </>
  );
}