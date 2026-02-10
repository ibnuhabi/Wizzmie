// controllers/galeriControllers.js - PROMISE VERSION
import db from "../db/connection.js";

/* =====================
   GET ALL GALERI
===================== */
export const getAllGaleri = async (req, res) => {
  try {
    console.log("🖼️ Fetching all gallery...");
    
    const [results] = await db.execute(
      "SELECT * FROM gallery ORDER BY id DESC"
    );
    
    console.log(`✅ Found ${results.length} gallery items`);
    res.json(results);
    
  } catch (err) {
    console.error("❌ ERROR fetching gallery:", err.message);
    res.status(500).json({ 
      message: "Gagal mengambil data galeri",
      error: err.message 
    });
  }
};

/* =====================
   CREATE GALERI
===================== */
export const createGaleri = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("➕ CREATE GALERI REQUEST");
    console.log("=".repeat(50));
    
    console.log("📥 Request body:", req.body);
    console.log("📥 Request file:", req.file);
    
    const { judul, keterangan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    console.log("📋 Data to insert:");
    console.log("- Judul:", judul);
    console.log("- Gambar:", gambar);
    console.log("- Keterangan:", keterangan);

    // Validasi
    if (!judul || !gambar) {
      return res.status(400).json({ 
        message: "Judul dan gambar wajib diisi" 
      });
    }

    const sql = `
      INSERT INTO gallery (judul, gambar, keterangan)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [judul, gambar, keterangan]);

    console.log("✅ Galeri created, ID:", result.insertId);
    
    res.json({ 
      message: "Galeri berhasil ditambahkan", 
      id: result.insertId 
    });
    
  } catch (err) {
    console.error("❌ CREATE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menambah galeri",
      error: err.message 
    });
  }
};

/* =====================
   UPDATE GALERI
===================== */
export const updateGaleri = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("✏️ UPDATE GALERI REQUEST");
    console.log("=".repeat(50));
    
    const { id } = req.params;
    const { judul, keterangan } = req.body;
    const gambar = req.file ? req.file.filename : req.body.gambar;

    console.log("📥 Galeri ID:", id);
    console.log("📥 Data:", { judul, gambar, keterangan });

    const sql = `
      UPDATE gallery 
      SET judul = ?, gambar = ?, keterangan = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [judul, gambar, keterangan, id]);

    console.log("✅ Galeri updated, affected rows:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Galeri tidak ditemukan" 
      });
    }

    res.json({ message: "Galeri berhasil diupdate" });
    
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal update galeri",
      error: err.message 
    });
  }
};

/* =====================
   DELETE GALERI
===================== */
export const deleteGaleri = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🗑️ DELETE Galeri ID:", id);

    const sql = "DELETE FROM gallery WHERE id = ?";
    
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Galeri tidak ditemukan" 
      });
    }

    console.log("✅ Galeri deleted, affected rows:", result.affectedRows);
    
    res.json({ message: "Galeri berhasil dihapus" });
    
  } catch (err) {
    console.error("❌ DELETE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menghapus galeri",
      error: err.message 
    });
  }
};