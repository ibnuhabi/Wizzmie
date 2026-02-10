import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const EventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    lokasi: "",
    deskripsi: "",
    link: "",
    gambar: "",
  });

  /* =====================
     FETCH EVENT
  ===================== */
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* =====================
     DELETE EVENT
  ===================== */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus event ini?")) return;

    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
    });

    fetchEvents();
  };

  /* =====================
     SUBMIT (FormData)
  ===================== */
  const handleSubmit = async () => {
    const url = isEdit
      ? `http://localhost:5000/api/events/${editId}`
      : "http://localhost:5000/api/events";

    const method = isEdit ? "PUT" : "POST";

    const data = new FormData();
    data.append("judul", form.judul);
    data.append("tanggal", form.tanggal);
    data.append("lokasi", form.lokasi);
    data.append("deskripsi", form.deskripsi);
    data.append("link", form.link);

    if (gambarFile) {
      data.append("gambar", gambarFile);
    }

    await fetch(url, {
      method,
      body: data,
    });

    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setGambarFile(null);
    setPreview(null);
    setForm({
      judul: "",
      tanggal: "",
      lokasi: "",
      deskripsi: "",
      link: "",
      gambar: "",
    });

    fetchEvents();
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manajemen Event</h1>
          <button
            onClick={() => {
              setIsEdit(false);
              setForm({
                judul: "",
                tanggal: "",
                lokasi: "",
                deskripsi: "",
                link: "",
                gambar: "",
              });
              setPreview(null);
              setGambarFile(null);
              setShowModal(true);
            }}
            className="bg-pink-600 text-white px-5 py-2 rounded"
          >
            + Tambah Event
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Gambar</th>
                <th className="p-4">Judul</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Lokasi</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <img
                      src={
                        item.gambar
                          ? `http://localhost:5000/images/event/${item.gambar}`
                          : "/images/no-image.png"
                      }
                      className="w-24 h-20 object-cover rounded"
                      alt={item.judul}
                    />
                  </td>
                  <td className="p-4 font-semibold">{item.judul}</td>
                  <td className="p-4">
                    {new Date(item.tanggal).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4">{item.lokasi}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setEditId(item.id);
                        setForm(item);
                        setPreview(
                          item.gambar
                            ? `http://localhost:5000/images/event/${item.gambar}`
                            : null
                        );
                        setGambarFile(null);
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
                {isEdit ? "Edit Event" : "Tambah Event"}
              </h2>

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Judul"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
              />

              <input
                type="date"
                className="w-full mb-3 p-2 border rounded"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Lokasi"
                value={form.lokasi}
                onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
              />

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setGambarFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <img
                  src={preview}
                  className="w-full h-48 object-cover rounded mb-3"
                  alt="Preview"
                />
              )}

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Link Event (opsional)"
                value={form.link || ""}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />

              <textarea
                className="w-full mb-4 p-2 border rounded"
                placeholder="Deskripsi"
                rows="4"
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

export default EventAdmin;
