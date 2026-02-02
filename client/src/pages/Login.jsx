import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      // Simpan token & admin ke localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setIsLoading(false);
      alert("Gagal konek ke server");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-400 to-blue-600 relative overflow-hidden p-4">
      {/* ...background & card tetap... */}

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20">
          <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Login Admin</h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* USERNAME */}
            <div className="relative group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400"
              >
                👁
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-full font-bold text-lg"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
  <p className="text-gray-500">Login khusus Admin Panel</p>

  <Link
    to="/"
    className="inline-flex items-center justify-center gap-2 text-cyan-600 hover:text-blue-600 font-semibold transition"
  >
    ← Kembali ke Home
  </Link>
</div>

        </div>
      </div>
    </div>
  );
}
