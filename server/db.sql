CREATE DATABASE IF NOT EXISTS pt_wizzmie;
USE pt_wizzmie;

-- =========================
-- TABLE: products
-- =========================
CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nama_produk VARCHAR(150) NOT NULL,
  deskripsi TEXT DEFAULT NULL,
  harga DECIMAL(12,2) DEFAULT 0.00,
  tipe ENUM('noodle', 'beverage', 'dimsum') NOT NULL,
  image VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLE: users
-- =========================
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLE: gallery
-- =========================
CREATE TABLE gallery (
  id INT(11) NOT NULL AUTO_INCREMENT,
  judul VARCHAR(100) DEFAULT NULL,
  gambar VARCHAR(255) NOT NULL,
  keterangan TEXT DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLE: partners
-- =========================
CREATE TABLE partners (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) DEFAULT NULL,
  logo VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================================
-- TABLE: events
-- =========================================
CREATE TABLE IF NOT EXISTS events (
  id INT(11) NOT NULL AUTO_INCREMENT,
  judul VARCHAR(150) NOT NULL,
  tanggal DATE NOT NULL,
  lokasi VARCHAR(150) NOT NULL,
  gambar VARCHAR(255) DEFAULT NULL,
  deskripsi TEXT DEFAULT NULL,
  link TEXT DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- =========================================
-- TABLE: articles
-- =========================================
CREATE TABLE IF NOT EXISTS articles (
  id INT(11) NOT NULL AUTO_INCREMENT,
  judul VARCHAR(150) NOT NULL,
  slug VARCHAR(255) DEFAULT NULL,
  isi TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  thumbnail VARCHAR(255) DEFAULT NULL,
  penulis VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


-- =========================================
-- TABLE: admins
-- =========================================
CREATE TABLE IF NOT EXISTS admins (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('superadmin','admin') DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  pesan TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLE: orders
-- =========================================
CREATE TABLE IF NOT EXISTS orders (
  id INT(11) NOT NULL AUTO_INCREMENT,
  order_code VARCHAR(50) NOT NULL UNIQUE,
  product_id INT(11) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================================
-- TABLE: payments
-- =========================================
CREATE TABLE IF NOT EXISTS payments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  customer_name VARCHAR(150),
  customer_email VARCHAR(150),
  customer_phone VARCHAR(20),
  gateway VARCHAR(50),
  method VARCHAR(50),
  amount DECIMAL(12,2),
  status VARCHAR(50) DEFAULT 'pending',
  transaction_id VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;