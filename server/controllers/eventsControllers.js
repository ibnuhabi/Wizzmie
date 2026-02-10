// controllers/eventsControllers.js - PROMISE VERSION
import db from "../db/connection.js";

/* =====================
   GET ALL EVENTS
===================== */
export const getAllEvent = async (req, res) => {
  try {
    console.log("📅 Fetching all events...");
    
    const [results] = await db.execute(
      "SELECT * FROM events ORDER BY tanggal DESC"
    );
    
    console.log(`✅ Found ${results.length} events`);
    res.json(results);
    
  } catch (err) {
    console.error("❌ ERROR fetching events:", err.message);
    res.status(500).json({ 
      message: "Gagal mengambil data event",
      error: err.message 
    });
  }
};

/* =====================
   CREATE EVENT
===================== */
export const createEvent = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("➕ CREATE EVENT REQUEST");
    console.log("=".repeat(50));
    
    console.log("📥 Request body:", req.body);
    console.log("📥 Request file:", req.file);
    
    const { judul, deskripsi, tanggal, lokasi, link } = req.body;
    const gambar = req.file ? req.file.filename : null;

    console.log("📋 Data to insert:");
    console.log("- Judul:", judul);
    console.log("- Tanggal:", tanggal);
    console.log("- Lokasi:", lokasi);
    console.log("- Gambar:", gambar);
    console.log("- Link:", link);

    // Validasi
    if (!judul || !tanggal || !lokasi) {
      return res.status(400).json({
        message: "Judul, tanggal, dan lokasi wajib diisi",
      });
    }

    const sql = `
      INSERT INTO events (judul, deskripsi, tanggal, lokasi, gambar, link)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      judul, 
      deskripsi, 
      tanggal, 
      lokasi, 
      gambar, 
      link
    ]);

    console.log("✅ Event created, ID:", result.insertId);
    
    res.json({
      message: "Event berhasil ditambahkan",
      id: result.insertId,
    });
    
  } catch (err) {
    console.error("❌ CREATE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menambah event",
      error: err.message 
    });
  }
};

/* =====================
   UPDATE EVENT
===================== */
export const updateEvent = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("✏️ UPDATE EVENT REQUEST");
    console.log("=".repeat(50));
    
    const { id } = req.params;
    const { judul, deskripsi, tanggal, lokasi, link } = req.body;
    const gambar = req.file ? req.file.filename : req.body.gambar;

    console.log("📥 Event ID:", id);
    console.log("📥 Data:", { judul, tanggal, lokasi, gambar, link });

    const sql = `
      UPDATE events 
      SET judul = ?, deskripsi = ?, tanggal = ?, lokasi = ?, gambar = ?, link = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
      judul, 
      deskripsi, 
      tanggal, 
      lokasi, 
      gambar, 
      link, 
      id
    ]);

    console.log("✅ Event updated, affected rows:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Event tidak ditemukan" 
      });
    }

    res.json({ message: "Event berhasil diupdate" });
    
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal update event",
      error: err.message 
    });
  }
};

/* =====================
   DELETE EVENT
===================== */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🗑️ DELETE Event ID:", id);

    const sql = "DELETE FROM events WHERE id = ?";
    
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Event tidak ditemukan" 
      });
    }

    console.log("✅ Event deleted, affected rows:", result.affectedRows);
    
    res.json({ message: "Event berhasil dihapus" });
    
  } catch (err) {
    console.error("❌ DELETE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menghapus event",
      error: err.message 
    });
  }
};