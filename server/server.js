import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connection.js";

import adminRoutes from "./routes/adminRoutes.js";
import artikelRoutes from './routes/artikelRoutes.js';
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

// ⚠️ PENTING: Middleware CORS harus di atas
app.use(cors());

// ⚠️ PENTING: JSON parser dengan limit lebih besar untuk webhook
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ✅ ROUTES - URUTAN PENTING!
// Webhook harus di atas karena tidak perlu auth
app.use('/api/webhook', webhookRoutes);

// Routes lainnya
app.use("/api/admin", adminRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/articles", artikelRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/products", produkRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Static files
app.use("/images", express.static("public/images"));

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "API berhasil berjalan 🚀",
    endpoints: {
      webhook: "/api/webhook/midtrans-notification",
      checkout: "/api/checkout",
      orders: "/api/orders",
      webhookTest: "/api/webhook/test"
    }
  });
});

// Test database
app.get('/api/test-db', async (req, res) => {
  try {
    const [result] = await db.execute('SELECT 1 + 1 AS test');
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

// 404 handler
app.use((req, res) => {
  console.log(`⚠️ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("📡 Webhook URL: http://localhost:${PORT}/api/webhook/midtrans-notification");
  console.log("🔗 Test webhook: http://localhost:${PORT}/api/webhook/test");
  console.log("=".repeat(60) + "\n");
});