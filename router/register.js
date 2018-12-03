
var express = require('express');
var router = express.Router();
var query = require('../mysql/query');

router.post('/', function (req, res) {
    var account = req.body.account;
    var password = req.body.password;

    console.log('请求注册接口成功');

    // 检验数据
    var checkOut = function () {
        var message = '';
        if (account == undefined || account == '') {
            message = '请输入账号';
        } else if (password == undefined || password == '') {
            message = '请输入密码';
        }
        return message;
    }

    if (checkOut() != '') {
        const data = { 'Success': true, Data: {}, Message: checkOut() };
        res.send(data);
    } else {
        query('select * from register', function (err, vals, fields) {
            if (err) {
                res.send(err);
            } else {
                var isExist = false;
                for (var i = 0; i < vals.length; i++) {
                    if (vals[i].account == account) {
                        isExist = true;
                        const data = { 'Success': true, Data: {}, Message: '账号已存在' };
                        res.send(data);
                    }
                }
                if (!isExist) {
                    query("insert into `register` (account,password) values ('" + account + "','" + password + "')", function (Err, Vals, Fields) {
                        if (Err) {
                            const data = { 'Success': true, Data: {}, Message: '注册失败' };
                            res.send(data);
                        } else {
                            const data = { 'Success': true, Data: vals, Message: '注册成功' };
                            res.send(data);
                        }
                    })
                }
            }
        })
    }

})

module.exports = router;