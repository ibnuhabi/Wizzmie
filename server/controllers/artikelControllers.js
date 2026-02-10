import db from "../db/connection.js";

/* =====================
   GET ALL ARTIKEL
===================== */
export const getAllArtikel = async (req, res) => {
  try {
    console.log("📚 Fetching all articles...");
    
    // ✅ BENAR: execute() untuk promise pool
    const [results] = await db.execute(
      "SELECT * FROM articles ORDER BY created_at DESC"
    );
    
    console.log(`✅ Found ${results.length} articles`);
    res.json(results);
    
  } catch (err) {
    console.error("❌ ERROR fetching articles:", err.message);
    res.status(500).json({ 
      message: "Gagal mengambil data artikel",
      error: err.message 
    });
  }
};

/* =====================
   CREATE ARTIKEL
===================== */
export const createArtikel = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("📝 CREATE ARTIKEL REQUEST");
    console.log("=".repeat(50));
    
    console.log("📥 Request body:", req.body);
    console.log("📥 Request file:", req.file);
    
    const { judul, slug, isi, penulis } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    console.log("📋 Data to insert:");
    console.log("- Judul:", judul);
    console.log("- Slug:", slug);
    console.log("- Isi length:", isi?.length);
    console.log("- Penulis:", penulis);
    console.log("- Thumbnail:", thumbnail);

    // Validasi
    if (!judul || !isi) {
      return res.status(400).json({ 
        success: false, 
        message: "Judul dan isi wajib diisi" 
      });
    }

    // ✅ BENAR: execute() dengan parameterized query
    const sql = `
      INSERT INTO articles (judul, slug, isi, thumbnail, penulis)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      judul, 
      slug, 
      isi, 
      thumbnail, 
      penulis || null
    ]);

    console.log("✅ Artikel created, ID:", result.insertId);
    
    res.json({ 
      success: true, 
      message: "Artikel berhasil ditambahkan",
      id: result.insertId 
    });
    
  } catch (err) {
    console.error("❌ CREATE ERROR:", err.message);
    console.error("❌ Full error:", err);
    
    res.status(500).json({ 
      success: false, 
      message: "Gagal menyimpan ke database",
      error: err.message 
    });
  }
};

/* =====================
   UPDATE ARTIKEL
===================== */
export const updateArtikel = async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("✏️ UPDATE ARTIKEL REQUEST");
    console.log("=".repeat(50));
    
    const { id } = req.params;
    
    console.log("📥 Artikel ID:", id);
    console.log("📥 Request body:", req.body);
    console.log("📥 Request file:", req.file);

    const { judul, slug, isi, penulis, existingThumbnail } = req.body;
    
    // Determine thumbnail
    let thumbnail;
    if (req.file) {
      thumbnail = req.file.filename;
      console.log("📸 Using new thumbnail:", thumbnail);
    } else if (existingThumbnail) {
      thumbnail = existingThumbnail;
      console.log("📸 Using existing thumbnail:", thumbnail);
    } else {
      thumbnail = null;
      console.log("📸 No thumbnail");
    }

    console.log("📋 Update data:");
    console.log("- Judul:", judul);
    console.log("- Slug:", slug);
    console.log("- Thumbnail:", thumbnail);
    console.log("- Penulis:", penulis);

    const sql = `
      UPDATE articles
      SET judul = ?, slug = ?, isi = ?, thumbnail = ?, penulis = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
      judul, 
      slug, 
      isi, 
      thumbnail, 
      penulis || null, 
      id
    ]);

    console.log("✅ Artikel updated, affected rows:", result.affectedRows);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Artikel tidak ditemukan" 
      });
    }

    res.json({ 
      success: true, 
      message: "Artikel berhasil diupdate" 
    });
    
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err.message);
    
    res.status(500).json({ 
      success: false, 
      message: "Gagal update artikel",
      error: err.message 
    });
  }
};

/* =====================
   DELETE ARTIKEL
===================== */
export const deleteArtikel = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🗑️ DELETE Artikel ID:", id);

    const sql = "DELETE FROM articles WHERE id = ?";
    
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Artikel tidak ditemukan" 
      });
    }

    console.log("✅ Artikel deleted, affected rows:", result.affectedRows);
    
    res.json({ 
      success: true, 
      message: "Artikel berhasil dihapus" 
    });
    
  } catch (err) {
    console.error("❌ DELETE ERROR:", err.message);
    
    res.status(500).json({ 
      success: false, 
      message: "Gagal menghapus artikel",
      error: err.message 
    });
  }
};