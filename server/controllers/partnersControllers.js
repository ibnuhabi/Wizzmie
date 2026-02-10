// controllers/partnersControllers.js - PROMISE VERSION
import db from "../db/connection.js";

/* =====================
   GET ALL PARTNERS
===================== */
export const getAllPartners = async (req, res) => {
  try {
    console.log("🤝 Fetching all partners...");
    
    const [results] = await db.execute(
      "SELECT * FROM partners ORDER BY name ASC"
    );
    
    console.log(`✅ Found ${results.length} partners`);
    res.json(results);
    
  } catch (err) {
    console.error("❌ ERROR fetching partners:", err.message);
    res.status(500).json({ 
      message: "Gagal mengambil data partners",
      error: err.message 
    });
  }
};

/* =====================
   CREATE PARTNER
===================== */
export const createPartner = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("➕ CREATE PARTNER REQUEST");
    console.log("=".repeat(50));
    
    console.log("📥 Request body:", req.body);
    console.log("📥 Request file:", req.file);
    
    const { name } = req.body;
    const logo = req.file?.filename;

    console.log("📋 Data to insert:");
    console.log("- Name:", name);
    console.log("- Logo:", logo);

    // Validasi
    if (!name || !logo) {
      return res.status(400).json({ 
        message: "Nama dan logo wajib diisi" 
      });
    }

    const sql = `
      INSERT INTO partners (name, logo)
      VALUES (?, ?)
    `;

    const [result] = await db.execute(sql, [name, logo]);

    console.log("✅ Partner created, ID:", result.insertId);
    
    res.json({
      message: "Partner berhasil ditambahkan",
      id: result.insertId,
    });
    
  } catch (err) {
    console.error("❌ CREATE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menambah partner",
      error: err.message 
    });
  }
};

/* =====================
   UPDATE PARTNER
===================== */
export const updatePartner = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("✏️ UPDATE PARTNER REQUEST");
    console.log("=".repeat(50));
    
    const { id } = req.params;
    const { name } = req.body;
    const logo = req.file?.filename;

    console.log("📥 Partner ID:", id);
    console.log("📥 Name:", name);
    console.log("📥 Logo:", logo || "(no new logo)");

    let sql = `UPDATE partners SET name = ?`;
    const params = [name];

    if (logo) {
      sql += `, logo = ?`;
      params.push(logo);
    }

    sql += ` WHERE id = ?`;
    params.push(id);

    const [result] = await db.execute(sql, params);

    console.log("✅ Partner updated, affected rows:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Partner tidak ditemukan" 
      });
    }

    res.json({ message: "Partner berhasil diupdate" });
    
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal update partner",
      error: err.message 
    });
  }
};

/* =====================
   DELETE PARTNER
===================== */
export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🗑️ DELETE Partner ID:", id);

    const sql = "DELETE FROM partners WHERE id = ?";
    
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Partner tidak ditemukan" 
      });
    }

    console.log("✅ Partner deleted, affected rows:", result.affectedRows);
    
    res.json({ message: "Partner berhasil dihapus" });
    
  } catch (err) {
    console.error("❌ DELETE ERROR:", err.message);
    res.status(500).json({ 
      message: "Gagal menghapus partner",
      error: err.message 
    });
  }
};