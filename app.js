const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 8080;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Welcome@123",
  port: 5432,
});

// Middleware to handle database connection
app.use((req, res, next) => {
  req.db = pool;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/product.route")(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
