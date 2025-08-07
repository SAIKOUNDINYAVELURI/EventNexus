const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'internships'
});

async function insertInternshipData({ title, url, imageUrl, author, datePublished }) {
  const [result] = await pool.query(
    'INSERT INTO internships (title, url, author, datePublished) VALUES (?, ?, ?, ?)',
    [title, url, imageUrl, author, datePublished]
  );
  return result;
}

async function getAllInternships() {
  const [rows] = await pool.query('SELECT * FROM internships ORDER BY id DESC');
  return rows;
}

async function checkInternshipExists(url) {
  const [rows] = await pool.query('SELECT * FROM internships WHERE url = ?', [url]);
  return rows.length > 0;
}

module.exports = {
  insertInternshipData,
  getAllInternships,
  checkInternshipExists
};

