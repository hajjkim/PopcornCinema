const pool = require("../config/db");

async function getAllPromotions() {
  const [rows] = await pool.query(`
    SELECT
      id,
      title,
      description,
      poster_url,
      discount_percent,
      discount_amount,
      start_date,
      end_date,
      status
    FROM promotions
    ORDER BY id DESC
  `);

  return rows;
}

module.exports = {
  getAllPromotions
};