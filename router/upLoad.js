
var express = require('express');
var router = express.Router();
var fs = require("fs");
var multiparty = require('multiparty');
var util = require('util');

router.post('/', function (req, res) {
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./uploads/";
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
        if (err) {
            const data = { 'Success': false, Data: {}, Message: "上传失败" };
            res.send(data);
        } else {
            console.log(fields);
            console.log(files);
            var originalFilename = files.file[0].originalFilename;
            var path = files.file[0].path;
            //同步重命名文件名
            fs.renameSync(path, originalFilename);

            const data = { 'Success': true, Data: {}, Message: "上传成功" };
            res.send(data);
            // res.writeHead(200, { 'content-type': 'text/plain' });
            // res.write('received upload:\n\n');
            // res.end(util.inspect({ fields: fields, files: files }));
        }
    });

})

module.exports = router;