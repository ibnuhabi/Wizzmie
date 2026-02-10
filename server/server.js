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
import produkRoutes from "./routes/produkRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/articles", artikelRoutes);      // ✅ artikel → articles
app.use("/api/events", eventsRoutes);          // ✅ sudah benar
app.use("/api/gallery", galleryRoutes);        // ✅ sudah benar
app.use("/api/partners", partnersRoutes);      // ✅ sudah benar
app.use("/api/products", produkRoutes);        // ✅ produk → products
app.use("/api/checkout", checkoutRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhook', webhookRoutes);
app.use("/images", express.static("public/images"));

// Route test
app.get("/", (req, res) => {
  res.json({ message: "API berhasil berjalan 🚀" });
});

app.get('/api/test-db', async (req, res) => {
  try {
    // Test connection
    const [result] = await db.execute('SELECT 1 + 1 AS test');

    // Cek tabel
    const [tables] = await db.execute('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);

    res.json({
      success: true,
      message: 'Database connected',
      test: result[0].test,
      tables: tableNames,
      missingTables: ['orders', 'payments'].filter(t => !tableNames.includes(t))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database error',
      error: error.message
    });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

