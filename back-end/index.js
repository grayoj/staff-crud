const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require("mysql2");
const { application } = require("express");
const { DOUBLE } = require("sequelize");

// Depreceated
// // Create connection pool to database
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "pencom-apps",
// });

// app.get("/", (res, req) => {
//   const sqlInsert =
//     "INSERT INTO staff_db (firstname, lastname, gender, position, dofa) VALUES ('Gerald', 'Maduabuchi', 'Male', 'Engineer', '21st June 2008')";
//   db.query(sqlInsert, (error, result) => {
//     console.log("error", error);
//     console.log("result", result);
//     res.send("Inserted successfully");
//   });
// });

const config = {
  host: "localhost",
  database: "pencom-apps",
  user: "root",
  password: "admin",
  connectionLimit: 100,
};

const connection = mysql.createConnection(config);
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// connection.connect(function (error) {
//   if (error) throw error;
//   console.log("Connected!");
//   const sqlInsert =
//     "INSERT INTO staff (firstname, lastname, gender, position, dofa) VALUES ('Gerald', 'Maduabuchi', 'Male', 'Engineer', '21-06-08')";
//   connection.query(sqlInsert, function (error) {
//     if (error) {
//       console.log(error.message);
//     }
//   });
// });

app.get("/api/get", (req, res) => {
  const sqlFetch = "SELECT * FROM staff";
  connection.query(sqlFetch, function (error, sqlFetch) {
    if (error) {
      console.log(error.message);
    }
    res.send(sqlFetch);
  });
});

// Insert into database
app.post("/api/post", (req, res) => {
  const { firstname, lastname, gender, position, dofa } = req.body;
  const sqlInsert =
    "INSERT INTO staff (firstname, lastname, gender, position, dofa) VALUES ('Gerald', 'Maduabuchi', 'Male', 'Engineer', '21-06-08')";
  connection.query(sqlInsert, function (error, sqlInsert) {
    if (error) {
      console.log(error.message);
    }
    res.send(sqlInsert);
  });
});

// app.delete("/api/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlDelete = "DELETE FROM staff WHERE id = ?";
//   connection.query(sqlDelete, id, function (error, sqlDelete) {
//     if (error) {
//       console.log(error);
//     }
//     res.send(sqlDelete);
//   });
// });

app.delete("/api/remove/:id", (req, res) => {
  const staffId = req.params.id;
  const q = "DELETE FROM staff WHERE id = ?";
  connection.query(q, [staffId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Deleted Staff Successfully.");
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
