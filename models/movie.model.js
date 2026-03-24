const pool = require("../config/db");

async function getAllMovies() {
  const [rows] = await pool.query(`
    SELECT *
    FROM movies
    ORDER BY id DESC
  `);
  return rows;
}

async function getFilteredMovies({ keyword = "", status = "" }) {
  let sql = `
    SELECT *
    FROM movies
    WHERE 1 = 1
  `;
  const params = [];

  if (keyword) {
    sql += ` AND title LIKE ? `;
    params.push(`%${keyword}%`);
  }

  if (status) {
    sql += ` AND status = ? `;
    params.push(status);
  }

  sql += ` ORDER BY id DESC `;

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getMovieById(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM movies
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

async function createMovie(data) {
  const [result] = await pool.query(
    `
    INSERT INTO movies (
      title, genre, duration, release_date, status, poster_url,
      age_rating, director, actors, language, subtitle, trailer_url, description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.title,
      data.genre,
      data.duration,
      data.release_date,
      data.status,
      data.poster_url,
      data.age_rating,
      data.director,
      data.actors,
      data.language,
      data.subtitle,
      data.trailer_url,
      data.description
    ]
  );

  return result.insertId;
}

async function updateMovie(id, data) {
  await pool.query(
    `
    UPDATE movies
    SET
      title = ?,
      genre = ?,
      duration = ?,
      release_date = ?,
      status = ?,
      poster_url = ?,
      age_rating = ?,
      director = ?,
      actors = ?,
      language = ?,
      subtitle = ?,
      trailer_url = ?,
      description = ?
    WHERE id = ?
    `,
    [
      data.title,
      data.genre,
      data.duration,
      data.release_date,
      data.status,
      data.poster_url,
      data.age_rating,
      data.director,
      data.actors,
      data.language,
      data.subtitle,
      data.trailer_url,
      data.description,
      id
    ]
  );
}

async function deleteMovie(id) {
  await pool.query(
    `
    DELETE FROM movies
    WHERE id = ?
    `,
    [id]
  );
}

module.exports = {
  getAllMovies,
  getFilteredMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};