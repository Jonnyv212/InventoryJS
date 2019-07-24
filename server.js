// const db = require("./DBconnection");
const queries = require("./queries");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const { Client } = require("pg");
const connection = new Client({
  connectionString:
    "postgres://yieprnegsnhliq:9ec369ca2ab02384a49c4c8470d3fde44133bc2970f9004afb67d9ca47de2dea@ec2-50-16-225-96.compute-1.amazonaws.com:5432/dd9kl2kgp8frpt",
  ssl: true
});

app.listen(port, () => {
  console.log("Listening to port: " + port);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

connection.connect(err => {
  if (err) {
    return err;
  }
});

queryData = (qpath, sql) => {
  app.get(qpath, (req, res) => {
    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error");
        return res.send(err);
      } else {
        console.log("Data: " + results);
        res.send(results.rows);
      }
    });
  });
};

app.get("/api/getInventoryID/:id", (req, res) => {
  connection.query(queries.q_inventoryID(req.params.id), (err, results) => {
    if (err) {
      console.log("Error");
      return res.send(err);
    } else {
      console.log("Data: " + results.rows);
      res.send(results.rows);
    }
  });
});

app.get("/api/getInventorySearch/:filter/:search", (req, res) => {
  connection.query(
    queries.q_inventorySearch(req.params.filter, req.params.search),
    (err, results) => {
      if (err) {
        console.log("Error");
        return res.send(err);
      } else {
        console.log("Data: " + results.rows);
        res.send(results.rows);
      }
    }
  );
});

console.log(queries.q_inventorySearch("equipment_name", "hp"));
queryData("/api/getProjects", queries.q_projects());
queryData("/api/getInventory", queries.q_inventory());
// queryData(
//   "/api/getInventorySearch/:filter/:search",
//   queries.q_inventorySearch(req.params.filter, req.params.search)
// );
// queryData("/api/getInventoryID/:id", queries.q_inventoryID(1));
queryData("/api/getHistory/", queries.q_history());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//Gets results from query in db.js as Objects (oracledb.outFormat = oracledb.OBJECT)

// //Server-side filtered data based on parameters /:column/:data sent by client request.
