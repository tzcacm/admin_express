var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');


var registerRouter = require('./router/register');
var loginRouter = require('./router/login');
var errorRouter = require('./router/error');

// 处理网址的任何method请求，全局调用
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/404', errorRouter);

app.use(function (req, res) {
    res.send('报错了');
});

http.createServer(app).listen(9000, function () {
    console.log('连接服务器成功');
});