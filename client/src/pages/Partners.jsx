import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    logo: "",
  });

  const fetchPartners = async () => {
    const res = await fetch("http://localhost:5000/api/partners");
    const data = await res.json();
    setPartners(data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
    const url = isEdit
      ? `http://localhost:5000/api/partners/${editId}`
      : "http://localhost:5000/api/partners";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setIsEdit(false);
    setForm({ nama: "", logo: "" });
    fetchPartners();
  };


  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus partner ini?")) return;

    await fetch(`http://localhost:5000/api/partners/${id}`, {
      method: "DELETE",
    });

    fetchPartners();
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manajemen Partners</h1>
          <button
            onClick={() => {
              setIsEdit(false);
              setForm({ nama: "", logo: "" });
              setShowModal(true);
            }}
            className="bg-[#EC008C] text-white px-5 py-2 rounded-lg"
          >
            + Tambah Partner
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Logo</th>
                <th className="p-4">Nama Partner</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {partners.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img
                      src={item.logo}
                      alt={item.nama}
                      className="h-16 object-contain"
                    />
                  </td>
                  <td className="p-4 font-semibold">{item.nama}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setEditId(item.id);
                        setForm({
                        nama: item.nama,
                        logo: item.logo,
                        });
                        setShowModal(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {partners.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">
                    Belum ada partner
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Edit Partner" : "Tambah Partner"}
              </h2>

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Nama Partner"
                value={form.nama}
                onChange={(e) =>
                  setForm({ ...form, nama: e.target.value })
                }
              />

              <input
                className="w-full mb-4 p-3 border rounded"
                placeholder="/images/partners/logo.png"
                value={form.logo}
                onChange={(e) =>
                  setForm({ ...form, logo: e.target.value })
                }
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Batal
                </button>
                <button
  type="button"
  onClick={(e) => handleSubmit(e)}
  className="bg-[#EC008C] text-white px-4 py-2 rounded"
>
  Simpan
</button>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Partners;