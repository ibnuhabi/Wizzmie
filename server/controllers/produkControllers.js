import db from "../db/connection.js";

/* =====================
   GET ALL PRODUK
===================== */
export const getAllProduk = (req, res) => {
  const sql = "SELECT * FROM products ORDER BY nama_produk ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Gagal mengambil data produk" });
    }
    res.json(results);
  });
};

/* =====================
   GET SINGLE PRODUK BY ID
===================== */
export const getProdukById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Gagal mengambil data produk" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(results[0]); // Return single object, bukan array
  });
};

/* =====================
   CREATE PRODUK
===================== */
export const createProduk = (req, res) => {
  const { nama_produk, deskripsi, harga, tipe } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!nama_produk || !harga || !tipe || !image) {
    return res.status(400).json({
      message: "Nama, harga, tipe, dan gambar wajib diisi",
    });
  }

  const sql = `
    INSERT INTO products (nama_produk, deskripsi, harga, tipe, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nama_produk, deskripsi, harga, tipe, image], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Gagal menambah produk" });
    }

    res.json({
      message: "Produk berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

/* =====================
   UPDATE PRODUK
===================== */
export const updateProduk = (req, res) => {
  const { id } = req.params;
  const { nama_produk, deskripsi, harga, tipe } = req.body;

  const image = req.file ? req.file.filename : req.body.image;

  const sql = `
    UPDATE products 
    SET nama_produk=?, deskripsi=?, harga=?, tipe=?, image=?
    WHERE id=?
  `;

  db.query(
    sql,
    [nama_produk, deskripsi, harga, tipe, image, id],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({ message: "Gagal update produk" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      res.json({ message: "Produk berhasil diupdate" });
    }
  );
};

/* =====================
   DELETE PRODUK
===================== */
export const deleteProduk = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({ message: "Gagal menghapus produk" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  });
};