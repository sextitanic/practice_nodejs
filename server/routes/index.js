var express = require('express');
var router = express.Router();
var path = require('path');

//如果網址後面是空的或是/index，就呼叫首頁
router.get(['/', '/index', '/index.html'], function(req, res, next)
{
    //輸出網頁，在 04_server.js 裡面有設定在 render 的時候會取用 views 資料夾內的檔案
    res.render('default', {});
});

module.exports = router;