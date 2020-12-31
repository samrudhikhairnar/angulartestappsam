const sql = require('mssql')
let config = {
    server: 'greyidentityserver.database.windows.net',
    database: 'identityserver',
    user: 'greyidentityuser',
    password: 'Adm!n@123',
    encrypt: true,
    port: 1433
};

export function RunQuery(query) {
    return new Promise ((resolve, reject) => {

    
   let dbConn = new sql.ConnectionPool(config)
    dbConn.connect().then(function () {
       
        var request = new sql.Request(dbConn);
        request.query(query).then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
            resolve(recordSet)
        }).catch(function (err) {

            console.log(err);
            dbConn.close();
            reject(err)
        });
    }).catch(function (err) {      
        console.log(err);
        reject(err)
    });
    })
}
