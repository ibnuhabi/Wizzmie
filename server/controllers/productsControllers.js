import db from "../db/connection.js";

/* =====================
   GET ALL PRODUCTS
===================== */
export const getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products ORDER BY name ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data products",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE PRODUCT
===================== */
export const createProduct = (req, res) => {
  const { name, description, price, image, category, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Nama dan harga wajib diisi",
    });
  }

  const sql = `
    INSERT INTO products (name, description, price, image, category, stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, image, category, stock],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal menambah product",
        });
      }

      res.json({
        message: "Product berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

/* =====================
   UPDATE PRODUCT
===================== */
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, stock } = req.body;

  const sql = `
    UPDATE products 
    SET name=?, description=?, price=?, image=?, category=?, stock=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, description, price, image, category, stock, id],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal update product",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product tidak ditemukan",
        });
      }

      res.json({ message: "Product berhasil diupdate" });
    }
  );
};

/* =====================
   DELETE PRODUCT
===================== */
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus product",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product tidak ditemukan",
      });
    }

    res.json({ message: "Product berhasil dihapus" });
  });
};