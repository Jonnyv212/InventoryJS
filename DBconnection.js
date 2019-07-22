// var oracledb = require("oracledb");
//var dbConfig = require("./dbconfig.js");
// const { Client } = require("pg");
// const connection = new Client({
//   connectionString:
//     "postgres://yieprnegsnhliq:9ec369ca2ab02384a49c4c8470d3fde44133bc2970f9004afb67d9ca47de2dea@ec2-50-16-225-96.compute-1.amazonaws.com:5432/dd9kl2kgp8frpt",
//   ssl: true
// });

// connection.connect(err => {
//   if (err) return err;
// });

// let QueryExecute = query => {
//   return new Promise((resolve, reject) => {
//     oracledb.getConnection(
//       {
//         user: con.user,
//         password: con.password,
//         connectionString: con.connectionString
//       },
//       (err, connection) => {
//         if (err) {
//           console.error(err.message);
//           reject(err);
//         }
//         connection.execute(
//           // The statement to execute
//           query,

//           // The callback function handles the SQL execution results
//           (err, result) => {
//             if (err) {
//               console.error(err.message);
//               doRelease(connection);
//               reject(err);
//             }
//             //console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
//             doRelease(connection);
//             return resolve(result.rows); // [ [ 180, 'Construction' ] ]
//           }
//         );
//       }
//     );
//   });
// };

// let doRelease = connection =>
//   connection.close(err => {
//     if (err) console.error(err.message);
//   });

// module.exports = QueryExecute;
