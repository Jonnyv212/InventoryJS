const db = require("./DBconnection");
const queries = require("./queries");
const express = require("express");
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log("Listening to port: " + port);
});

//Gets results from query in db.js as Objects (oracledb.outFormat = oracledb.OBJECT)
app.get("/inventory/api/getInventory/", (req, res) => {
  db(queries.q_inventory()).then(dbResults => {
    res.send(dbResults);
  });
});

//Server-side filtered data based on parameters /:column/:data sent by client.
app.get("/inventory/api/getInventorySearch/:filter/:search", (req, res) => {
  db(queries.q_inventorySearch(req.params.filter, req.params.search)).then(
    dbResults => {
      res.send(dbResults);
    }
  );
});

app.get("/projects/api/getProjects/", (req, res) => {
  db(queries.q_projects()).then(dbResults => {
    res.send(dbResults);
    //console.log(queries());
  });
});

app.get("/history/api/getHistory/", (req, res) => {
  db(queries.q_history()).then(dbResults => {
    res.send(dbResults);
    //console.log(queries());
  });
});
