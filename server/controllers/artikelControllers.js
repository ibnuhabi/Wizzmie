import db from "../db/connection.js";

/* =====================
   GET ALL ARTIKEL
===================== */
export const getAllArtikel = (req, res) => {
  const sql = "SELECT * FROM articles ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Gagal mengambil data artikel" });
    }
    res.json(results);
  });
};

/* =====================
   CREATE ARTIKEL
===================== */
export const createArtikel = (req, res) => {
  const { judul, slug, isi, penulis } = req.body;

  const thumbnail = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO articles (judul, slug, isi, thumbnail, penulis)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [judul, slug, isi, thumbnail, penulis], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal" });

    res.json({ message: "Artikel berhasil ditambahkan" });
  });
};


/* =====================
   UPDATE ARTIKEL
===================== */
export const updateArtikel = (req, res) => {
  const { id } = req.params;
  const { judul, slug, isi, penulis } = req.body;

  const thumbnail = req.file ? req.file.filename : req.body.thumbnail;

  const sql = `
    UPDATE articles
    SET judul=?, slug=?, isi=?, thumbnail=?, penulis=?
    WHERE id=?
  `;

  db.query(sql, [judul, slug, isi, thumbnail, penulis, id], (err) => {
    if (err) return res.status(500).json({ message: "Gagal update" });

    res.json({ message: "Artikel berhasil diupdate" });
  });
};



/* =====================
   DELETE ARTIKEL
===================== */
export const deleteArtikel = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM articles WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Gagal menghapus artikel" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    res.json({ message: "Artikel berhasil dihapus" });
  });
};
