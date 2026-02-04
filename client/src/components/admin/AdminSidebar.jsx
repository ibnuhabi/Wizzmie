import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Articles", table: "articles",  },
    { name: "Partners", table: "partners",  },
    { name: "Events", table: "event",  },
    { name: "Gallery", table: "gallery",  },
    { name: "Products", table: "products", },
    { name: "Contacts", table: "contacts" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <h1 className="text-2xl font-extrabold tracking-tight">Admin Panel</h1>
        <p className="text-slate-400 text-xs mt-1">Management System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 ${
            isActive("/admin/dashboard")
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105"
              : "bg-slate-700/50 hover:bg-slate-700 hover:translate-x-1"
          }`}
        >

          <span>Dashboard</span>
        </button>

        <div className="pt-4 pb-2 px-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Content Management
          </span>
        </div>

        {menus.map((menu) => (
          <button
            key={menu.table}
            onClick={() => navigate(`/admin/${menu.table}`)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
              isActive(`/admin/${menu.table}`)
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105 font-semibold"
                : "hover:bg-slate-700 hover:translate-x-1"
            }`}
          >
            <span className="text-xl">{menu.icon}</span>
            <span>{menu.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/login");
          }}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;