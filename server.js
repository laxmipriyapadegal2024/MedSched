const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Oracle Database connection configuration
const dbConfig = {
  user: 'your_username', // Replace with your Oracle DB username
  password: 'your_password', // Replace with your Oracle DB password
  connectString: 'localhost:1521/your_service_name' // Replace with your Oracle DB connection string
};

// Test database connection
async function testConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to Oracle Database');
    await connection.close();
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  }
}

testConnection();

// Example route to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM your_table'); // Replace with your table name
    res.json(result.rows);
    await connection.close();
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});