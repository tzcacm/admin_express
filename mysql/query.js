var mysql = require('mysql');

// 创建 mysql 连接池资源
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    database: 'mysql'
});

var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};

module.exports = query;