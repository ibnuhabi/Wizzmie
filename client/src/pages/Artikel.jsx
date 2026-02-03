import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const Artikel = () => {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    slug: "",
    isi: "",
    thumbnail: "",
    penulis: "",
  });

  /* =====================
     FETCH ARTIKEL
  ===================== */
  const fetchArtikel = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/artikel");
      const data = await res.json();
      setArtikels(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  /* =====================
     DELETE ARTIKEL
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus artikel ini?")) return;

    await fetch(`http://localhost:5000/api/artikel/${id}`, {
      method: "DELETE",
    });

    fetchArtikel();
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/artikel/${editId}`
      : "http://localhost:5000/api/artikel";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setIsEdit(false);
    setForm({
      judul: "",
      slug: "",
      isi: "",
      thumbnail: "",
      penulis: "",
    });
    fetchArtikel();
  };

  if (loading) return <p className="text-center mt-10">Loading artikel...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manajemen Artikel</h1>
          <button
            onClick={() => {
              setIsEdit(false);
              setForm({
                judul: "",
                slug: "",
                isi: "",
                thumbnail: "",
                penulis: "",
              });
              setShowModal(true);
            }}
            className="bg-pink-600 text-white px-5 py-2 rounded"
          >
            + Tambah Artikel
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Judul</th>
                <th className="p-4">Penulis</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {artikels.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img
                      src={item.thumbnail || "/images/no-image.png"}
                            className="w-24 h-20 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow"
                            alt={item.judul}
                    />
                  </td>
                  <td className="p-4 font-semibold">{item.judul}</td>
                  <td className="p-4">{item.penulis || "-"}</td>
                  <td className="p-4 flex justify-center gap-2">
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
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Edit Artikel" : "Tambah Artikel"}
              </h2>

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Judul"
                value={form.judul}
                onChange={(e) =>
                  setForm({ ...form, judul: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Slug"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Thumbnail"
                value={form.thumbnail}
                onChange={(e) =>
                  setForm({ ...form, thumbnail: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Penulis"
                value={form.penulis}
                onChange={(e) =>
                  setForm({ ...form, penulis: e.target.value })
                }
              />

              <textarea
                className="w-full mb-4 p-2 border rounded"
                placeholder="Isi Artikel"
                rows="5"
                value={form.isi}
                onChange={(e) =>
                  setForm({ ...form, isi: e.target.value })
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
                  className="bg-pink-600 text-white px-4 py-2 rounded"
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

export default Artikel;