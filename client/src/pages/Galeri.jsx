import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const Galeri = () => {
  const [galeri, setGaleri] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    file_gambar: "",
  });

  const fetchGaleri = async () => {
    const res = await fetch("http://localhost:5000/api/galeri");
    const data = await res.json();
    setGaleri(data);
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/galeri/${editId}`
      : "http://localhost:5000/api/galeri";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setIsEdit(false);
    setForm({ judul: "", deskripsi: "", file_gambar: "" });
    fetchGaleri();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus galeri ini?")) return;

    await fetch(`http://localhost:5000/api/galeri/${id}`, {
      method: "DELETE",
    });
    fetchGaleri();
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manajemen Galeri</h1>
          <button
            onClick={() => {
              setIsEdit(false);
              setForm({ judul: "", deskripsi: "", file_gambar: "" });
              setShowModal(true);
            }}
            className="bg-[#EC008C] text-white px-5 py-2 rounded-lg"
          >
            + Tambah Galeri
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Gambar</th>
                <th className="p-4">Judul</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {galeri.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img
                      src={item.file_gambar}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-semibold">{item.judul}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setEditId(item.id);
                        setForm(item);
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

              {galeri.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">
                    Belum ada galeri
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
                {isEdit ? "Edit Galeri" : "Tambah Galeri"}
              </h2>

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Judul"
                value={form.judul}
                onChange={(e) =>
                  setForm({ ...form, judul: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Path Gambar (/images/gallery/xxx.jpg)"
                value={form.file_gambar}
                onChange={(e) =>
                  setForm({ ...form, file_gambar: e.target.value })
                }
              />

              <textarea
                className="w-full mb-4 p-3 border rounded"
                placeholder="Deskripsi"
                value={form.deskripsi}
                onChange={(e) =>
                  setForm({ ...form, deskripsi: e.target.value })
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
                  onClick={handleSubmit}
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

export default Galeri;