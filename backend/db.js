// db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: "Mansi@642000",       // your MySQL password
  database: "synutrify"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database ✅");
  }
});

module.exports = db;
