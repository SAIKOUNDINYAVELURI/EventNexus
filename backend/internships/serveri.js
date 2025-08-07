const express = require('express');
const cors = require('cors');
const { getAllInternships } = require('./databasei');
require('dotenv').config({ path: './.env' });


const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/internships', async (req, res) => {
  try {
    const internships = await getAllInternships();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Internship server running at http://localhost:${PORT}`);
});
