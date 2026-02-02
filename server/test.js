// debug.js
console.log('🔴 Mulai debug...');

try {
  console.log('1. Mencoba import connection...');
  const dbModule = await import('./db/connection.js');
  console.log('✅ connection.js berhasil di-import:', dbModule);
} catch (err) {
  console.error('❌ Error import connection:', err.message);
  console.error('Stack:', err.stack);
}

try {
  console.log('\n2. Mencoba import artikelRoutes...');
  const artikelModule = await import('./routes/artikelRoutes.js');
  console.log('✅ artikelRoutes.js berhasil di-import:', artikelModule);
} catch (err) {
  console.error('❌ Error import artikelRoutes:', err.message);
  console.error('Stack:', err.stack);
}

console.log('\n🔴 Debug selesai');