const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mango_chat'
});

connection.connect();

var sql = 'select * from mg_user';
connection.query(sql, function selectCb(err, results, fields) {
    if (err) {
        throw err;
    }
    if (results) {
        for (var i = 0; i < results.length; i++) {
            console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].password);
        }
    }
    closeConnection(connection);
});

function closeConnection(connect) {
    connect.end(function(err) {
        if (err) {
            console.info('数据库关闭时出现异常...');
        } else {
            console.info("数据库连接已关闭...");
        }
    });
}
