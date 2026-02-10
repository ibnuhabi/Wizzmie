import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    logo: "",
  });

  /* =====================
     FETCH PARTNERS
  ===================== */
  const fetchPartners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  /* =====================
     DELETE PARTNER
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus partner ini?")) return;

    await fetch(`http://localhost:5000/api/partners/${id}`, {
      method: "DELETE",
    });

    fetchPartners();
  };

  /* =====================
     SUBMIT (FormData)
  ===================== */
  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/partners/${editId}`
      : "http://localhost:5000/api/partners";

    const method = isEdit ? "PUT" : "POST";

    const data = new FormData();
    data.append("name", form.name);

    if (logoFile) {
      data.append("logo", logoFile); // ⬅️ HARUS "logo"
    }

    await fetch(url, {
      method,
      body: data,
    });

    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setLogoFile(null);
    setPreview(null);
    setForm({ name: "", logo: "" });

    fetchPartners();
  };

  if (loading) return <p className="text-center mt-10">Loading partners...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manajemen Partners</h1>
          <button
            onClick={() => {
              setIsEdit(false);
              setForm({ name: "", logo: "" });
              setPreview(null);
              setLogoFile(null);
              setShowModal(true);
            }}
            className="bg-pink-600 text-white px-5 py-2 rounded"
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
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img
                      src={
                        item.logo
                          ? `http://localhost:5000/images/partners/${item.logo}`
                          : "/images/no-image.png"
                      }
                      className="w-24 h-20 object-contain rounded mx-auto"
                      alt={item.name}
                    />
                  </td>
                  <td className="p-4 font-semibold text-center">
                    {item.name}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setEditId(item.id);
                        setForm(item);
                        setPreview(
                          item.logo
                            ? `http://localhost:5000/images/partners/${item.logo}`
                            : null
                        );
                        setLogoFile(null);
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
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Edit Partner" : "Tambah Partner"}
              </h2>

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Nama Partner"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setLogoFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <img
                  src={preview}
                  className="w-full h-40 object-contain rounded mb-3"
                  alt="Preview"
                />
              )}

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

export default Partners;
