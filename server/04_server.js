/**
 * 使用 express 框架
 * 輕鬆取得 get 和 post 的值
 * 建立可直接存取的公開檔案
 * 使用 view engine 模板解析將程式和 html 乾淨切割
 */

var http = require('http'); //載入建立 http server 的模組
var express = require('express'); //載入 express 框架
var path = require('path'); //載入能轉換不同作業系統路徑的模組
var bodyParser = require('body-parser'); //能取得 html 傳入值的模組
var app = express(); //將 express 指定給 app 變數
var member = require('./routes/member'); //載入我們自己撰寫的程式
var index = require('./routes/index'); //載入我們自己撰寫的程式

//設定 render  view 端網頁要使用的檔案放哪
app.set('views', path.join(__dirname, 'views'));
//使用 ejs 產生網頁內容，並把要 render 的副檔名從 ejs 改為 html
app.engine('html', require('ejs').renderFile);
//設定 express 使用我們剛才修改的 html 引擎
app.set('view engine', 'html');

var server = http.createServer(app); //建立一個 http server，規則使用 express

app.use(bodyParser.json()); //解析網頁傳來的 JSON
app.use(bodyParser.urlencoded({ extended: false })); //解析網頁傳來的 x-www-form-urlencoded

//把 public 資料夾內的內容設定為可直接使用，不用打路徑
app.use(express.static(path.normalize(__dirname + '/public/')));

//在依不同路徑執行不同程式前，先寫個 log 記錄一下
app.use(function(request, response, next)
{
    //將傳進來的參數寫入 log
    console.log('url: %s，parameter: %s', request.url, JSON.stringify(request.body));
    //加這一行才能繼續執行下面的程式
    next();
});
//如果沒有輸入其他網址的話是帶 index 變數裡面定義的規則
app.use('/', index);
//如果網址後面是帶 member 的話，就使用 member 變數裡面定義的規則
app.use('/member', member);
app.use('*', function(request, response)
{
    response.status(404).send('404 Page Not Found');
});

server.listen(3000); //監聽 3000 port