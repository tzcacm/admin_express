
var express = require('express');
var router = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');
const wxInfoData = require('../utils/common')

router.post('/', function (req, res) {
    const code = req.body.code;//登陆传过来的code
    if (!code) {
        return res.send('code无效');
    }
    const appid = wxInfoData.appid; //自己小程序后台管理的appid，可登录小程序后台查看
    const secret = wxInfoData.secret; //小程序后台管理的secret，可登录小程序后台查看
    const grant_type = wxInfoData.grant_type

    console.log(wxInfoData)

    request("https://api.weixin.qq.com/sns/jscode2session?grant_type=" + grant_type + "&appid=" + appid + "&secret=" + secret + "&js_code=" + code, (error, response, body) => {
        console.log(response)
        if (response.statusCode == 200) {
            const { openid, session_key } = JSON.parse(body) || {}
            mySsessionKey = session_key
            myOpenid = openid
            const tokenName = { name: wxInfoData.tokenName }
            const tokenSecret = wxInfoData.tokenSecret
            // 这是加密的key（密钥）,可以是任意的内容，但在开发中一般不写在代码中，而是一个文件
            const token = jwt.sign(tokenName, tokenSecret, { expiresIn: 60 * 60 * 8 });// 8小时过期
            res.send({ code: 0, token: token, Message: '成功' })
        }
    })
})

module.exports = router;