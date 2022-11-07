const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "pencom-apps",
});

app.get("/", (req, res) => {
  res.json("Nodejs Landing Page");
});

app.get("/staff", (req, res) => {
  const q = "SELECT * FROM staff";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/staff", (req, res) => {
  const q =
    "INSERT INTO staff(`firstname`, `lastname`, `gender`, `position`, `dofa`) VALUES (?)";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.gender,
    req.body.position,
    req.body.dofa,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/staff/:id", (req, res) => {
  const staffId = req.params.id;
  const q = " DELETE FROM staff WHERE id = ? ";

  db.query(q, [staffId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/staff/:id", (req, res) => {
  const staffId = req.params.id;
  const q =
    "UPDATE staff SET `firstname`= ?, `lastname`= ?, `gender`= ?, `position`= ?, `dofa`= ? WHERE id = ?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.gender,
    req.body.position,
    req.body.dofa,
  ];

  db.query(q, [...values, staffId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/staff/:id", (req, res) => {
  const q = "SELECT * FROM staff";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
