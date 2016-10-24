/**
 * 如何應用 module.exports 給外部檔案使用
 * 搭配不同的 port 建立伺服器
 * 使用 url 套件解析路徑
 * 解析 get 或 post 的值
 * 再用 fs(file system) 套件輸出網頁
 */

var http = require('http'); //使用 node.js 的全域套件 http
var url = require('url'); //使用 node.js 的全域套件 url
var fs = require('fs'); //讀取檔案的套件
var html = fs.readFileSync('./server/views/default.html', 'utf8'); //以同步方式讀取檔案
var qs = require('querystring'); //解析網址 get 參數的套件

//建立 start_server function
function start_server(port)
{
    //建立一個伺服器
    http.createServer(function(request, response)
    {
        var path = url.parse(request.url).pathname; //解析網址路徑
        switch(path)
        {
            //如果網址後面帶 member 的話就執行
            case '/member':
                //如果是用 post 方式傳進來的話
                if(request.method == 'POST')
                {
                    var body = '';
                    var post = {};
                    //建立一個 data 事件，當瀏覽器傳入 post 值時觸發
                    request.on('data', function(data)
                    {
                        body = body + data; //將傳入的值串起來
                    });
                    //傳的值都結束之後
                    request.on('end', function()
                    {
                        post = qs.parse(body); //用 querystring 套件解析
                        console.log(post); //輸出到 console 看一下結果
                        response.end();
                    });
                }
                else
                {
                    response.end('no input');
                }
                break;
            //如果網址後面都沒帶就執行
            case '/':
                response.end(html);
                break;
            //不符合以上規定的都輸出無此網頁
            default:
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write('404 Page Not Found');
                response.end();
        }
    }).listen(port); //設定要監聽的 port
}

//把 start_server function 指定給變數 start 供外部檔案使用
module.exports = {
    start: start_server
};