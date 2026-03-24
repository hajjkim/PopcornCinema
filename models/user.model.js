const pool = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT id, full_name, email, password_hash, role, status
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.query(
    `
    SELECT id, full_name, email, role, status
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

async function createUser({ fullName, email, passwordHash, phone = null, role = "CUSTOMER" }) {
  const [result] = await pool.query(
    `
    INSERT INTO users (full_name, email, password_hash, phone, role, status)
    VALUES (?, ?, ?, ?, ?, 'ACTIVE')
    `,
    [fullName, email, passwordHash, phone, role]
  );

  return result.insertId;
}



module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};
//----------------- profile-----------------------//

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT id, full_name, email, password_hash, role, status
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.query(
    `
    SELECT id, full_name, email, role, status
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

async function getProfileById(id) {
  const [rows] = await pool.query(
    `
    SELECT id, full_name, email, phone, role, status, created_at
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

async function createUser({ fullName, email, passwordHash, phone = null, role = "CUSTOMER" }) {
  const [result] = await pool.query(
    `
    INSERT INTO users (full_name, email, password_hash, phone, role, status)
    VALUES (?, ?, ?, ?, ?, 'ACTIVE')
    `,
    [fullName, email, passwordHash, phone, role]
  );

  return result.insertId;
}

module.exports = {
  findUserByEmail,
  findUserById,
  getProfileById,
  createUser
};