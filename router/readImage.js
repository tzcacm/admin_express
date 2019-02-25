
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');
var fs = require("fs");

router.get('/', function (req, res) {

    console.log('读取本地图片成功');

    fs.readdir("./uploads/images", function (err, files) {
        if (err) {
            console.log(err);
        } else {
            console.log(files[0]);
            query("insert into `message` (image,title,content) values (" + files[0] + ")", function (err, vals, fields) {
                if (err) {
                    const data = { 'Success': false, Data: {}, Message: '上传图片失败' };
                    res.send(data);
                } else {
                    const data = { 'Success': true, Data: {}, Message: '上传图片成功' };
                    res.send(data);
                }
            })
        }
    })
})

module.exports = router;