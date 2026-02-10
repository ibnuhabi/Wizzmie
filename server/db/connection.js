// db/connection.js - FIXED FOR EMPTY PASSWORD:

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 DB Config Check:');
console.log('- Host:', process.env.DB_HOST);
console.log('- User:', process.env.DB_USER);
console.log('- Database:', process.env.DB_NAME);
console.log('- Password:', process.env.DB_PASS ? '(set)' : '(empty)');

// Config tanpa password field jika kosong
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'pt_wizzmie',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// HANYA tambah password jika tidak kosong
if (process.env.DB_PASS && process.env.DB_PASS.trim() !== '') {
    dbConfig.password = process.env.DB_PASS;
    console.log('🔑 Using password');
} else {
    console.log('🔓 No password (empty)');
}

// Buat connection pool
const pool = mysql.createPool(dbConfig);

// Test connection dengan retry
async function testConnection(retries = 3) {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`🔗 Attempting MySQL connection (${i}/${retries})...`);
            
            const connection = await pool.getConnection();
            
            // Test query sederhana
            const [result] = await connection.execute('SELECT 1 + 1 AS test, NOW() as time');
            console.log('✅ MySQL Connected!');
            console.log('   Test query:', result[0].test);
            console.log('   Server time:', result[0].time);
            
            // Cek database exists
            const [dbs] = await connection.execute('SHOW DATABASES');
            const dbExists = dbs.some(db => Object.values(db)[0] === process.env.DB_NAME);
            console.log(`   Database "${process.env.DB_NAME}" exists:`, dbExists);
            
            connection.release();
            return true;
            
        } catch (error) {
            console.error(`❌ Connection attempt ${i} failed:`, error.message);
            
            if (i === retries) {
                console.log('\n💡 Troubleshooting:');
                console.log('1. Pastikan MySQL service berjalan');
                console.log('2. Cek: mysql -u root (tanpa -p)');
                console.log('3. Buat database: CREATE DATABASE pt_wizzmie;');
                console.log('4. Cek .env file configuration');
                return false;
            }
            
            // Tunggu sebentar sebelum retry
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// Jalankan test
testConnection();

export default pool;