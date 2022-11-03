// If you already have records in your database, you could use
// the mysql 2 sequelize module to only connect to your database
// instead of creating models

// const mysql = require("mysql");

// const config = {
//   host: "localhost",
//   database: "pencom-apps",
//   user: "root",
//   password: "admin",
//   connectionLimit: 100,
// };

// const connection = mysql.createConnection(config);

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

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
