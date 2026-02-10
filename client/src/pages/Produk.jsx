import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const ProdukAdmin = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    nama_produk: "",
    deskripsi: "",
    harga: "",
    tipe: "",
    image: "",
  });

  const TIPE_PRODUK = ["noodle", "beverage", "dimsum"];

  /* =====================
     FETCH PRODUK
  ===================== */
  const fetchProduk = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/produk");
      const data = await res.json();
      setProduk(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  /* =====================
     DELETE PRODUK
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;

    await fetch(`http://localhost:5000/api/produk/${id}`, {
      method: "DELETE",
    });

    fetchProduk();
  };

  /* =====================
     SUBMIT (FormData)
  ===================== */
  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/produk/${editId}`
      : "http://localhost:5000/api/produk";

    const method = isEdit ? "PUT" : "POST";

    const data = new FormData();
    data.append("nama_produk", form.nama_produk);
    data.append("deskripsi", form.deskripsi);
    data.append("harga", form.harga);
    data.append("tipe", form.tipe);

    if (imageFile) {
      data.append("image", imageFile); // ⬅️ sesuai upload.single("image")
    }

    await fetch(url, {
      method,
      body: data,
    });

    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setImageFile(null);
    setPreview(null);
    setForm({
      nama_produk: "",
      deskripsi: "",
      harga: "",
      tipe: "",
      image: "",
    });

    fetchProduk();
  };

  if (loading) return <p className="text-center mt-10">Loading produk...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manajemen Produk</h1>
          <button
            onClick={() => {
              setIsEdit(false);
              setForm({
                nama_produk: "",
                deskripsi: "",
                harga: "",
                tipe: "",
                image: "",
              });
              setPreview(null);
              setImageFile(null);
              setShowModal(true);
            }}
            className="bg-[#EC008C] text-white px-5 py-2 rounded"
          >
            + Tambah Produk
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Gambar</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Tipe</th>
                <th className="p-4">Harga</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {produk.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/images/produk/${item.image}`
                          : "/images/no-image.png"
                      }
                      className="w-20 h-16 object-cover rounded"
                      alt={item.nama_produk}
                    />
                  </td>
                  <td className="p-4 font-semibold">{item.nama_produk}</td>
                  <td className="p-4 capitalize">{item.tipe}</td>
                  <td className="p-4">
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setEditId(item.id);
                        setForm(item);
                        setPreview(
                          item.image
                            ? `http://localhost:5000/images/produk/${item.image}`
                            : null
                        );
                        setImageFile(null);
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

              {produk.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    Belum ada produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Edit Produk" : "Tambah Produk"}
              </h2>

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Nama Produk"
                value={form.nama_produk}
                onChange={(e) =>
                  setForm({ ...form, nama_produk: e.target.value })
                }
              />

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                className="w-full mb-3 p-3 border rounded"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <img
                  src={preview}
                  className="w-full h-40 object-cover rounded mb-3"
                  alt="Preview"
                />
              )}

              <select
                className="w-full mb-3 p-3 border rounded"
                value={form.tipe}
                onChange={(e) =>
                  setForm({ ...form, tipe: e.target.value })
                }
              >
                <option value="">-- Pilih Tipe --</option>
                {TIPE_PRODUK.map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="w-full mb-3 p-3 border rounded"
                placeholder="Harga"
                value={form.harga}
                onChange={(e) =>
                  setForm({ ...form, harga: e.target.value })
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

export default ProdukAdmin;
