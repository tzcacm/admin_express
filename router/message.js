
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');

router.get('/', function (req, res) {
    var account = req.param('account');
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');

    console.log('请求留言接口成功');

    query("SELECT * FROM `message` WHERE id LIMIT " + ((pageIndex - 1) * pageSize) + "," + pageSize, function (err, vals, fields) {
        if (err) {
            const data = { 'Success': false, Message: '服务器出问题了' };
            res.send(data);
        } else {
            let message = vals;
            query("SELECT COUNT(*) FROM `message`", function (err, vals, fields) {
                const data = { 'Success': true, Data: { messageList: message,messageListCount:vals[0]['COUNT(*)'] }, Message: '请求成功' };
                res.send(data);
            })
        }
    })


})

module.exports = router;