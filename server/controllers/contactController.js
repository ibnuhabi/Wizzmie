// controllers/contactControllers.js - PROMISE VERSION
import db from "../db/connection.js";
import nodemailer from "nodemailer";

/* =====================
   CREATE CONTACT
===================== */
export const createContact = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("📨 CREATE CONTACT REQUEST");
    console.log("=".repeat(50));
    console.log("📥 BODY DARI FRONTEND:", req.body);

    const { nama, email, pesan } = req.body;

    // Validasi
    if (!nama || !email || !pesan) {
      return res.status(400).json({ 
        message: "Semua field wajib diisi" 
      });
    }

    const sql = "INSERT INTO contacts (nama, email, pesan) VALUES (?, ?, ?)";

    const [result] = await db.execute(sql, [nama, email, pesan]);

    console.log("✅ Contact created, ID:", result.insertId);

    res.json({ message: "Pesan berhasil dikirim" });
    
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menyimpan pesan",
      error: err.message 
    });
  }
};

/* =====================
   GET ALL CONTACTS
===================== */
export const getAllContacts = async (req, res) => {
  try {
    console.log("📬 Fetching all contacts...");

    const [results] = await db.execute(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );

    console.log(`✅ Found ${results.length} contacts`);
    res.json(results);
    
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal ambil data",
      error: err.message 
    });
  }
};

/* =====================
   DELETE CONTACT
===================== */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ DELETE Contact ID:", id);

    // Validasi
    if (!id) {
      return res.status(400).json({ 
        message: "ID contact wajib ada" 
      });
    }

    const sql = "DELETE FROM contacts WHERE id = ?";

    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Data tidak ditemukan" 
      });
    }

    console.log("✅ Contact deleted, affected rows:", result.affectedRows);

    res.json({ message: "Pesan berhasil dihapus" });
    
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menghapus pesan",
      error: err.message 
    });
  }
};