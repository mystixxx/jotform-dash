const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.post("/forms/createTable", async (req, res) => {
  const { formName, questions } = req.body;

  try {
    console.log(`Received request to create table for formName: ${formName}`);

    let createTableQuery = `CREATE TABLE IF NOT EXISTS ${formName} (id SERIAL PRIMARY KEY`;

    questions.forEach((question) => {
      createTableQuery += `, ${question.name} VARCHAR(255)`;
    });

    createTableQuery += `);`;
    console.log(`Executing query: ${createTableQuery}`);

    await pool.query(createTableQuery);

    res.status(201).json({ message: "Table created successfully" });
  } catch (error) {
    console.error("Error creating table:", error);
    res
      .status(500)
      .json({ message: "Error creating table", error: error.message });
  }
});

app.post("/submit-answers/:formName", async (req, res) => {
  const { formName } = req.params;
  const submissionData = req.body.submissionData;

  if (typeof submissionData !== "object" || submissionData === null) {
    return res.status(400).json({ error: "Invalid submission data format" });
  }

  const columns = Object.keys(submissionData);
  const values = Object.values(submissionData);

  const selectQuery = `
    SELECT COUNT(*) AS count
    FROM ${formName}
    WHERE ${columns.map((col, index) => `${col} = $${index + 1}`).join(" AND ")}
  `;

  try {
    const existingRecords = await pool.query(selectQuery, values);
    const count = existingRecords.rows[0].count;

    if (count > 0) {
      return res.status(409).json({ message: "Answers already exist!" });
    }

    const placeholders = values.map((_, index) => `$${index + 1}`).join(", "); 
    const insertQuery = `INSERT INTO ${formName} (${columns.join(", ")}) VALUES (${placeholders})`;

    await pool.query(insertQuery, values); 
    res.status(201).json({ message: "Answers submitted successfully!" });
  } catch (error) {
    console.error("Error inserting answers:", error);
    res.status(500).json({ error: "Error recording answers", details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
