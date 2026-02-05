import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contact");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReply = async (email) => {
    const message = prompt("Tulis balasan email:");

    if (!message) return;

    await fetch("http://localhost:5000/api/contact/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Balasan dari Wizzmie",
        message,
      }),
    });

    alert("Email berhasil dikirim!");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Pesan Masuk
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">Nama</th>
                <th className="p-4">Email</th>
                <th className="p-4">Pesan</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{c.nama}</td>
                  <td className="p-4 text-blue-600">{c.email}</td>
                  <td className="p-4 text-gray-700 max-w-md truncate">
                    {c.pesan}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleReply(c.email)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}

              {contacts.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    Belum ada pesan masuk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ContactAdmin;
