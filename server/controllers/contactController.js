import db from "../db/connection.js";
import nodemailer from "nodemailer";

/* =====================
   CREATE CONTACT
===================== */
export const createContact = (req, res) => {
    console.log("BODY DARI FRONTEND:", req.body);

    const { nama, email, pesan } = req.body;

    if (!nama || !email || !pesan) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const sql = "INSERT INTO contacts (nama, email, pesan) VALUES (?, ?, ?)";

    db.query(sql, [nama, email, pesan], (err, result) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Gagal menyimpan pesan" });
        }

        res.json({ message: "Pesan berhasil dikirim" });
    });
};

/* =====================
   GET ALL CONTACTS
===================== */
export const getAllContacts = (req, res) => {
    const sql = "SELECT * FROM contacts ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Gagal ambil data" });
        }

        res.json(results);
    });
};

/* =====================
   DELETE CONTACT
===================== */
export const deleteContact = (req, res) => {
    const { id } = req.params; // ambil ID dari URL

    if (!id) {
        return res.status(400).json({ message: "ID contact wajib ada" });
    }

    const sql = "DELETE FROM contacts WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Gagal menghapus pesan" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ message: "Pesan berhasil dihapus" });
    });
};
