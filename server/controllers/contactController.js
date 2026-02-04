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
   REPLY EMAIL
===================== */
export const replyContact = async (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Wizzmie Admin" <${process.env.MAIL_USER}>`,
            to,
            subject,
            text: message,
        });

        res.json({ message: "Email berhasil dikirim" });
    } catch (err) {
        console.error("MAIL ERROR:", err);
        res.status(500).json({ message: "Gagal kirim email" });
    }
};
