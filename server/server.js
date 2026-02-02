import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connection.js";

import adminRoutes from "./routes/adminRoutes.js";
// import artikelRoutes from "./routes/artikelRoutes.js";
import artikelRoutes from './routes/artikelRoutes.js'
import eventsRoutes from "./routes/eventsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import partnersRoutes from "./routes/partnersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/artikel", artikelRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/products", productsRoutes);

// Route test
app.get("/", (req, res) => {
  res.json({ message: "API berhasil berjalan 🚀" });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
