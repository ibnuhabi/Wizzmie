import db from "../db/connection.js";

/* =====================
   GET ALL PRODUCTS
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
   CREATE PRODUCT
===================== */
export const createProduk = (req, res) => {
  const { nama_produk, deskripsi, harga, tipe, image } = req.body;

  if (!nama_produk || !harga || !tipe) {
    return res.status(400).json({
      message: "Nama, harga, dan tipe wajib diisi",
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
   UPDATE PRODUCT
===================== */
export const updateProduk = (req, res) => {
  const { id } = req.params;
  const { nama_produk, deskripsi, harga, tipe, image } = req.body;

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
   DELETE PRODUCT
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
