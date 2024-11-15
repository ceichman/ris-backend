const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create an express app
const app = express();
const PORT = 3000;

// Enable CORS (optional, depending on your frontend's needs)
app.use(cors());

// Create a connection to MariaDB
const db = mysql.createConnection({
  host: 'localhost',  // MariaDB host (localhost if on the same machine)
  user: 'ris',       // The username (root if you're using default settings)
  password: 'rispass',       // Your MariaDB root password
  database: 'ris_db',  // The database name
});

// Connect to MariaDB
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MariaDB:', err.stack);
    return;
  }
  console.log('Connected to MariaDB as id ' + db.threadId);
});

// Example POST endpoint for saving data to MariaDB
app.post('/log', (req, res) => {
  console.log("request from ", req.ip)
  const { primaryPlan, secondaryPlan, time, ip } = req.body;

  if (!primaryPlan || !secondaryPlan || !time || !ip) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO log (primaryPlan, secondaryPlan, time, ip) VALUES (?, ?, ?, ?)';

  db.execute(query, [primaryPlan, secondaryPlan, time, ip], (err, results) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).json({ error: 'Server error while saving data' });
    }

    res.status(201).json({
      message: 'Data saved successfully',
      data: {
        id: results.insertId,
        primaryPlan: primaryPlan,
        secondaryPlan: secondaryPlan,
        time: time,
	ip: ip
      },
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

