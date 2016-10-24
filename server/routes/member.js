var express = require('express');
var router = express.Router();
var path = require('path');

//如果網址後面是空的或是/index，就呼叫首頁
router.get(['/', '/index'], function(req, res, next)
{
    //輸出網頁，在 04_server.js 裡面有設定在 render 的時候會取用 views 資料夾內的檔案
    res.render('home', {});
});
//如果表單用 post 到 login 頁面，就使用下面的 function
router.post('/login', function(req, res, next)
{
    res.render('login', {'user_name': req.body.user_name, 'nick_name': req.body.nick_name});
});
router.get('*', function(req, res, next)
{
    res.redirect('/member');
});

module.exports = router;