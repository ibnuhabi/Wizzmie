import db from "../db/connection.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   GET ALL PRODUK
===================== */
export const getAllProduk = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM products ORDER BY nama_produk ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("ERROR DB:", err);
    res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};

/* =====================
   GET SINGLE PRODUK BY ID
===================== */
export const getProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("ERROR DB:", err);
    res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};

/* =====================
   CREATE PRODUK
===================== */
export const createProduk = async (req, res) => {
  try {
    console.log("📦 Request Body:", req.body);
    console.log("📁 Uploaded File:", req.file);

    const { nama_produk, deskripsi, harga, tipe } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validasi
    if (!nama_produk || !harga || !tipe) {
      return res.status(400).json({
        message: "Nama produk, harga, dan tipe wajib diisi!",
      });
    }

    // Insert ke database
    const sql = `
      INSERT INTO products (nama_produk, deskripsi, harga, tipe, image)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      nama_produk,
      deskripsi || null,
      harga,
      tipe,
      image,
    ]);

    console.log("✅ Produk berhasil ditambahkan dengan ID:", result.insertId);

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      id: result.insertId,
      nama_produk,
      image,
    });
  } catch (err) {
    console.error("❌ ERROR CREATE PRODUK:", err);
    res.status(500).json({ 
      message: "Gagal menambah produk",
      error: err.message 
    });
  }
};

/* =====================
   UPDATE PRODUK
===================== */
export const updateProduk = async (req, res) => {
  try {
    console.log("🔄 Updating product ID:", req.params.id);
    console.log("📦 Request Body:", req.body);
    console.log("📁 Uploaded File:", req.file);

    const { id } = req.params;
    const { nama_produk, deskripsi, harga, tipe } = req.body;

    // Cek produk ada atau tidak
    const [existing] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const oldImage = existing[0].image;
    let newImage = oldImage;

    // Jika ada file baru yang diupload
    if (req.file) {
      newImage = req.file.filename;

      // Hapus gambar lama jika ada
      if (oldImage) {
        const oldPath = path.join(__dirname, "../public/images/produk", oldImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log("🗑️ Gambar lama dihapus:", oldImage);
        }
      }
    }

    // Update database
    const sql = `
      UPDATE products 
      SET nama_produk=?, deskripsi=?, harga=?, tipe=?, image=?
      WHERE id=?
    `;

    const [result] = await db.execute(sql, [
      nama_produk,
      deskripsi || null,
      harga,
      tipe,
      newImage,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    console.log("✅ Produk berhasil diupdate");

    res.json({ 
      message: "Produk berhasil diupdate",
      image: newImage 
    });
  } catch (err) {
    console.error("❌ ERROR UPDATE PRODUK:", err);
    res.status(500).json({ 
      message: "Gagal update produk",
      error: err.message 
    });
  }
};

/* =====================
   DELETE PRODUK
===================== */
export const deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek produk ada atau tidak & ambil nama file gambar
    const [existing] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const image = existing[0].image;

    // Hapus gambar jika ada
    if (image) {
      const imagePath = path.join(__dirname, "../public/images/produk", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Gambar dihapus:", image);
      }
    }

    // Delete dari database
    const [result] = await db.execute("DELETE FROM products WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    console.log("✅ Produk berhasil dihapus");

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error("❌ ERROR DELETE PRODUK:", err);
    res.status(500).json({ 
      message: "Gagal menghapus produk",
      error: err.message 
    });
  }
};