const pool = require("./config/db");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    console.log("Kết nối thành công:", rows);
  } catch (error) {
    console.error("Lỗi kết nối DB:", error.message);
  } finally {
    process.exit();
  }
}

testConnection();