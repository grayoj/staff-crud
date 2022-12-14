const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const saltRounds = 10;
const bcrypt = require("bcrypt");

// Cross-Origin Resource Sharing
app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

// This connects to the database
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
  const insert = "SELECT * FROM staff";
  db.query(insert, (err, data) => {
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

app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO user_table (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_table WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
