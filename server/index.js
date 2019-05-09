const db = require("./DBconnection");
const queries = require("./queries");
const express = require("express");
const app = express();
//const router = express.Router();
const port = 3001;

app.listen(port, () => {
  console.log("Listening to port: " + port);
});
//Gets results from query in db.js as Objects (oracledb.outFormat = oracledb.OBJECT)
app.get("/inventory/api/getInventory/", (req, res) => {
  db(queries.q_inventory).then(dbResults => {
    //var results = dbResults.filter(objArr => {
    // return objArr.INVENTORY_ID >= "50";
    //});

    res.send(dbResults);
    //console.log(queries());
  });
});

app.get("/projects/api/getProjects/", (req, res) => {
  db(queries.q_projects).then(dbResults => {
    res.send(dbResults);
    //console.log(queries());
  });
});

app.get("/history/api/getHistory/", (req, res) => {
  db(queries.q_history).then(dbResults => {
    res.send(dbResults);
    //console.log(queries());
  });
});
