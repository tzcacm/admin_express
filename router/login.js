
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');
var md5 = require('md5-node');
const jwt = require('jsonwebtoken');
const wxInfoData = require('../utils/common')

router.post('/', function (req, res) {
    console.log('请求登陆接口成功');
    var account = req.param('account');
    var password = req.param('password');
    const token = req.body.token
    // 验证token
    jwt.verify(token, wxInfoData.tokenSecret, function (err, decode) {
        if (err) {  //  时间失效的时候或者伪造的token          
            res.send({ 'status': 0 });
        } else {
            res.send({ 'status': 1 });
        }
    })

    // 检验数据
    var checkOut = function () {
        var message = '';
        if (account == undefined || account == null || account == '') {
            message = '请输入账号';
        } else if (password == undefined || password == null || password == '') {
            message = '请输入密码';
        }
        return message;
    }

    if (checkOut() != '') {
        const data = { 'Success': false, Data: {}, Message: checkOut() };
        res.send(data);
    } else {
        query("SELECT * FROM `register`", function (err, vals, fields) {
            if (err) {
                console.log(err);
                const data = { 'Success': false, Message: '服务器出问题了' };
                res.send(data);
            } else {
                var isExist = false;
                for (var i = 0; i < vals.length; i++) {
                    if (vals[i].account == account) {
                        isExist = true;
                        if (md5(vals[i].password) == password) {
                            var data = { 'Success': true, Data: { account: vals[i].account, password: vals[i].password }, Message: '登陆成功' };
                        } else {
                            var data = { 'Success': false, Message: '密码错误' };
                        }
                        res.send(data);
                    }
                }
                if (!isExist) {
                    const data = { 'Success': false, Data: {}, Message: '账号不存在' };
                    res.send(data);
                }
            }
        })
    }
})

module.exports = router;