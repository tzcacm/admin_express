
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');
var fs = require("fs");

router.get('/', function (req, res) {
    var image = req.param('imageUrl');
    var title = req.param('title');
    var content = req.param('content');

    console.log('请求增添数据成功');

    // 检验数据
    var checkOut = function () {
        var message = '';
        if (image == undefined || image == '') {
            message = '图片不能为空';
        } else if (title == undefined || title == '') {
            message = '标题不能为空';
        } else if (content == undefined || content == '') {
            message = '内容不能为空';
        }
        return message;
    }

    if (checkOut() != '') {
        const data = { 'Success': true, Data: {}, Message: checkOut() };
        res.send(data);
    } else {
        fs.readdir('./uploads/images', function (err, files) {
            if (err) {
                console.log(err);
            } else {
                var fileData = 'http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg';
                query("insert into `message` (image,title,content) values ('" + fileData + "','" + title + "','" + content + "')", function (err, vals, fields) {
                    if (err) {
                        const data = { 'Success': false, Data: {}, Message: '请求失败' };
                        res.send(data);
                    } else {
                        const data = { 'Success': true, Data: {}, Message: '请求成功' };
                        res.send(data);
                    }
                })

            }
        })

    }

})

module.exports = router;