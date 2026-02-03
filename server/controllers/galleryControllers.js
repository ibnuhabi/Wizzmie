import db from "../db/connection.js";

/* =====================
   GET ALL GALERI
===================== */
export const getAllGaleri = (req, res) => {
  const sql = "SELECT * FROM gallery ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data galeri",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE GALERI
===================== */
export const createGaleri = (req, res) => {
  const { judul, gambar, keterangan } = req.body;

  if (!judul || !gambar) {
    return res.status(400).json({
      message: "Judul dan gambar wajib diisi",
    });
  }

  const sql = `
    INSERT INTO gallery (judul, gambar, keterangan)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [judul, gambar, keterangan], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menambah galeri",
      });
    }

    res.json({
      message: "Galeri berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

/* =====================
   UPDATE GALERI
===================== */
export const updateGaleri = (req, res) => {
  const { id } = req.params;
  const { judul, gambar, keterangan } = req.body;

  const sql = `
    UPDATE gallery 
    SET judul=?, gambar=?, keterangan=?
    WHERE id=?
  `;

  db.query(sql, [judul, gambar, keterangan, id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal update galeri",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Galeri tidak ditemukan",
      });
    }

    res.json({ message: "Galeri berhasil diupdate" });
  });
};

/* =====================
   DELETE GALERI
===================== */
export const deleteGaleri = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM gallery WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus galeri",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Galeri tidak ditemukan",
      });
    }

    res.json({ message: "Galeri berhasil dihapus" });
  });
};
