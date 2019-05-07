const express = require("express");
const router = express.Router();
const db = require("../../db");
const query = require("../../queries");

// router.get("/", (req, res) => {
//   db(query.q_inventory).then(dbResults => {
//     //var results = dbResults.filter(objArr => {
//     // return objArr.INVENTORY_ID >= "50";
//     //});

//     res.send(dbResults);
//     //console.log(queries());
//   });
// });
