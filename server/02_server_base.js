/**
 * 如何應用 module.exports 給外部檔案使用
 * 搭配不同的 port 建立伺服器
 */

var http = require('http'); //使用 node.js 的全域套件 http

//建立一個 start_server 函式
function start_server(port)
{
    //建立一個伺服器
    http.createServer(function(request, response)
    {
        response.writeHead(200, {"Content-Type": "text/plain"}); //設定 header
        response.write("Hello world");
        response.end();
    }).listen(port); //設定要監聽的 port
}

//把 function start_server 指定給 start 供外部檔案使用
module.exports = {
    start: start_server
};