import db from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    });
  });
};