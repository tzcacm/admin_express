
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');

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
        fs.readdir('./uploads', function (err, files) {
            if (err) { return };
            fs.writeFile('./uploads',image, function (err, data) {
                if(err){
                    console.log('报错')
                }
                console.log('写入成功');
            })
            console.log(files);
        })



        // query("insert into `message` (image,title,content) values (" + image + "," + title + "," + content + ")", function (err, vals, fields) {
        //     if (err) {
        //         const data = { 'Success': false, Data: {}, Message: '请求失败' };
        //         res.send(data);
        //     } else {
        //         const data = { 'Success': true, Data: {}, Message: '请求成功' };
        //         res.send(data);
        //     }
        // })
    }

})

module.exports = router;