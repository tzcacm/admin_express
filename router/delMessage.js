
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');

router.post('/', function (req, res) {
    var id = JSON.parse(req.body.data).id;

    console.log('请求删除数据成功');

    query('DELETE FROM `message` WHERE id=' + id, function (err, vals, fields) {
        if (err) {
            const data = { 'Success': false, Data: {}, Message: '删除失败' };
            res.send(data);
        } else {
            const data = { 'Success': true, Data: {}, Message: '删除成功' };
            res.send(data);
        }
    })

})

module.exports = router;