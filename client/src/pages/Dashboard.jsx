import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/login");

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const menus = [
    { 
      name: "Articles", 
      table: "articles", 
      icon: "📝",
      desc: "Manage blog posts and news",
      gradient: "from-blue-500 to-blue-600"
    },
    { 
      name: "Partners", 
      table: "partners", 
      icon: "🤝",
      desc: "Manage business partners",
      gradient: "from-emerald-500 to-emerald-600"
    },
    { 
      name: "Events", 
      table: "events", 
      icon: "📅",
      desc: "Manage upcoming events",
      gradient: "from-purple-500 to-purple-600"
    },
    { 
      name: "Gallery", 
      table: "gallery", 
      icon: "🖼️",
      desc: "Manage photo collections",
      gradient: "from-pink-500 to-pink-600"
    },
    { 
      name: "Products", 
      table: "products", 
      icon: "📦",
      desc: "Manage product catalog",
      gradient: "from-orange-500 to-orange-600"
    },
  ];

  const stats = [
    { label: "Total Articles", value: "-"},
    { label: "Active Events", value: "-"},
    { label: "Gallery Items", value: "-"},
    { label: "Products", value: "-",},
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-1">
                Admin Wizzmie
              </h1>
              <p className="text-slate-500">
                {currentTime.toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime.toLocaleTimeString('id-ID')}
              </p>
            </div>
            <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg">
              <p className="text-sm opacity-90">Admin Dashboard</p>
              <p className="text-2xl font-bold">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div
              key={menu.table}
              onClick={() => navigate(`/admin/${menu.table}`)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border border-slate-200 hover:border-transparent hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${menu.gradient} text-white flex items-center justify-center rounded-2xl mb-4 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {menu.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {menu.name}
              </h3>

              <p className="text-slate-500 text-sm mb-4">
                {menu.desc}
              </p>

              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                <span>Manage</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;