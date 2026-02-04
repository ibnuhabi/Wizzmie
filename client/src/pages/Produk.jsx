import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const ProdukAdmin = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
   nama_produk: "",
   deskripsi: "",
   harga: "",
   tipe: "",
   image: "",
});

  const [editId, setEditId] = useState(null);
  const TIPE_PRODUK = ["noodle", "beverage", "dimsum"];


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

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;

    try {
      await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: "DELETE",
      });
      fetchProduk();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
  try {
    const url = isEdit
      ? `http://localhost:5000/api/produk/${editId}`
      : "http://localhost:5000/api/produk";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setForm({ nama_produk: "", tipe: "", harga: "" });
    setIsEdit(false);
    fetchProduk();
  } catch (err) {
    console.error(err);
  }
};


  if (loading) {
    return <p className="text-center mt-10">Loading produk...</p>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Produk
          </h1>

          <button
            onClick={() => {
              setIsEdit(false);
              setForm({ nama_produk: "", tipe: "", harga: "" });
              setShowModal(true);
            }}
            className="bg-[#EC008C] text-white px-5 py-2 rounded-lg hover:bg-pink-600"
          >
            + Tambah Produk
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th>Nama</th>
                <th>Produk</th>
                 <th>Tipe</th>
              <th>Harga</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

           <tbody>
  {produk.map((item) => (
    <tr key={item.id} className="border-t hover:bg-gray-50">
      <td className="p-4 font-semibold">
        {item.nama_produk}
      </td>

      {/* GAMBAR */}
      <td className="p-4">
        {item.image ? (
          <img
            src={item.image}
            alt={item.nama_produk}
            className="w-20 h-20 object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        )}
      </td>

      <td className="p-4 capitalize">{item.tipe}</td>

      <td className="p-4">
        Rp {Number(item.harga).toLocaleString("id-ID")}
      </td>

      <td className="p-4 flex justify-center gap-2">
        <button
          onClick={() => {
            setIsEdit(true);
            setEditId(item.id);
            setForm({
              nama_produk: item.nama_produk,
              deskripsi: item.deskripsi,
              harga: item.harga,
              tipe: item.tipe,
              image: item.image,
            });
            setShowModal(true);
          }}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(item.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
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
          {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
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
      <input
  type="text"
  className="w-full mb-4 p-3 border rounded"
  placeholder="/images/nama-gambar.png"
  value={form.image}
  onChange={(e) =>
    setForm({ ...form, image: e.target.value })
  }
/>

      <select
      className="w-full mb-3 p-3 border rounded bg-white"
      value={form.tipe}
      onChange={(e) =>
        setForm({ ...form, tipe: e.target.value })
      }
    >
      <option value="">-- Pilih Tipe Produk --</option>
      {TIPE_PRODUK.map((tipe) => (
        <option key={tipe} value={tipe}>
          {tipe.toUpperCase()}
        </option>
      ))}
    </select>
                <input
                  type="number"
                  className="w-full mb-4 p-3 border rounded"
                  placeholder="Harga"
                  value={form.harga}
                  onChange={(e) =>
                    setForm({ ...form, harga: e.target.value })
                  }
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#EC008C] text-white rounded"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProdukAdmin;