import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const EventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    lokasi: "",
    gambar: "",
    deskripsi: "",
    link: "",  // tambah ini
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

    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  /* =====================
     SUBMIT (CREATE / UPDATE)
  ===================== */
  const handleSubmit = async () => {
    try {
      const url = isEdit
        ? `http://localhost:5000/api/events/${editId}`
        : "http://localhost:5000/api/events";

      const method = isEdit ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setShowModal(false);
      setIsEdit(false);
      setForm({
        judul: "",
        tanggal: "",
        lokasi: "",
        gambar: "",
        deskripsi: "",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading event...</p>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Event
          </h1>

          <button
            onClick={() => {
              setIsEdit(false);
              setForm({
                judul: "",
                tanggal: "",
                lokasi: "",
                gambar: "",
                deskripsi: "",
              });
              setShowModal(true);
            }}
            className="bg-[#EC008C] text-white px-5 py-2 rounded-lg hover:bg-pink-600"
          >
            + Tambah Event
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
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
                <tr key={item.id} className="border-t hover:bg-gray-50">
  {/* GAMBAR */}
  <td className="p-4">
    <img
      src={item.gambar}
      alt={item.judul}
      className="w-20 h-16 object-cover rounded"
      onError={(e) => {
        e.target.src = "/images/no-image.png";
      }}
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
        setForm({
          judul: item.judul,
          tanggal: item.tanggal,
          lokasi: item.lokasi,
          gambar: item.gambar,
          deskripsi: item.deskripsi,
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

              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    Belum ada event
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Edit Event" : "Tambah Event"}
              </h2>

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Judul Event"
                value={form.judul}
                onChange={(e) =>
                  setForm({ ...form, judul: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full mb-3 p-3 border rounded"
                value={form.tanggal}
                onChange={(e) =>
                  setForm({ ...form, tanggal: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Lokasi"
                value={form.lokasi}
                onChange={(e) =>
                  setForm({ ...form, lokasi: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="/images/events/gambar.png"
                value={form.gambar}
                onChange={(e) =>
                  setForm({ ...form, gambar: e.target.value })
                }
              />

              <input
  className="w-full mb-3 p-3 border rounded"
  placeholder="Link Event (optional)"
  value={form.link || ""}
  onChange={(e) => setForm({ ...form, link: e.target.value })}
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
      </main>
    </div>
  );
};

export default EventAdmin;