require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '08052005@sql',
  database: 'hackathons'
});


// Check if a hackathon already exists based on URL
async function checkHackathonExists(url) {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM hackathons WHERE url = ?', [url]);
  await connection.end();
  return rows[0].count > 0;
}

// Insert hackathon into the database
async function insertHackathonData(hackathon) {
  const connection = await mysql.createConnection(dbConfig);

  const { title, host, submissionPeriod, url, timeLeft, location, themes } = hackathon;

  try {
    await connection.execute(
      'INSERT INTO hackathons (title, host, submission_period, url, time_left, location, themes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, host, submissionPeriod, url, timeLeft, location, themes.join(', ')]
    );
    console.log(`✅ Inserted: ${title}`);
  } catch (error) {
    console.error('❌ Failed to insert:', error.message);
  } finally {
    await connection.end();
  }
}

module.exports = {
  insertHackathonData,
  checkHackathonExists,
};
