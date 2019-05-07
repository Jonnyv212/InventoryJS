var oracledb = require("oracledb");
//var dbConfig = require("./dbconfig.js");
var con = {
  user: "JONNYV",
  password: "AjGoEnvA101",
  connectionString:
    "(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=172.20.26.41)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME= Dev.path.med.umich.edu)))"
};

oracledb.outFormat = oracledb.OBJECT;

let QueryExecute = query => {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(
      {
        user: con.user,
        password: con.password,
        connectionString: con.connectionString
      },
      (err, connection) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        connection.execute(
          // The statement to execute
          query,

          // The callback function handles the SQL execution results
          (err, result) => {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              reject(err);
            }
            //console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
            doRelease(connection);
            return resolve(result.rows); // [ [ 180, 'Construction' ] ]
          }
        );
      }
    );
  });
};

// Note: connections should always be released when not needed
// function doRelease(connection) {
//   connection.close(function(err) {
//     if (err) {
//       console.error(err.message);
//     }
//   });
// }

let doRelease = connection =>
  connection.close(err => {
    if (err) console.error(err.message);
  });

module.exports = QueryExecute;
