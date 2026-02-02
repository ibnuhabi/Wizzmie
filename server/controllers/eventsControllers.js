import db from "../db/connection.js";

/* =====================
   GET ALL EVENTS
===================== */
export const getAllEvent = (req, res) => {
  const sql = "SELECT * FROM events ORDER BY date DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data event",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE EVENT
===================== */
export const createEvent = (req, res) => {
  const { title, description, date, location, image } = req.body;

  if (!title || !date) {
    return res.status(400).json({
      message: "Judul dan tanggal wajib diisi",
    });
  }

  const sql = `
    INSERT INTO events (title, description, date, location, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, date, location, image],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal menambah event",
        });
      }

      res.json({
        message: "Event berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

/* =====================
   UPDATE EVENT
===================== */
export const updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, image } = req.body;

  const sql = `
    UPDATE events 
    SET title=?, description=?, date=?, location=?, image=?
    WHERE id=?
  `;

  db.query(
    sql,
    [title, description, date, location, image, id],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal update event",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Event tidak ditemukan",
        });
      }

      res.json({ message: "Event berhasil diupdate" });
    }
  );
};

/* =====================
   DELETE EVENT
===================== */
export const deleteEvent = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM events WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus event",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json({ message: "Event berhasil dihapus" });
  });
};