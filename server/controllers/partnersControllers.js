import db from "../db/connection.js";

/* =====================
   GET ALL PARTNERS
===================== */
export const getAllPartners = (req, res) => {
  const sql = "SELECT * FROM partners ORDER BY name ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data partners",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE PARTNER
===================== */
export const createPartner = (req, res) => {
  const { name, logo, website, description, type } = req.body;

  if (!name || !logo) {
    return res.status(400).json({
      message: "Nama dan logo wajib diisi",
    });
  }

  const sql = `
    INSERT INTO partners (name, logo, website, description, type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, logo, website, description, type],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal menambah partner",
        });
      }

      res.json({
        message: "Partner berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

/* =====================
   UPDATE PARTNER
===================== */
export const updatePartner = (req, res) => {
  const { id } = req.params;
  const { name, logo, website, description, type } = req.body;

  const sql = `
    UPDATE partners 
    SET name=?, logo=?, website=?, description=?, type=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, logo, website, description, type, id],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal update partner",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Partner tidak ditemukan",
        });
      }

      res.json({ message: "Partner berhasil diupdate" });
    }
  );
};

/* =====================
   DELETE PARTNER
===================== */
export const deletePartner = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM partners WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus partner",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Partner tidak ditemukan",
      });
    }

    res.json({ message: "Partner berhasil dihapus" });
  });
};