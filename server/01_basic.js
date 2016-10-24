/**
 * 簡單的建立一個可以回應 hello world 的伺服器
 */

var http = require('http'); //使用 node.js 的全域套件 http

//建立一個最基本的 server，每當有人進入伺服器的時候才會觸發
//request 是客戶端傳入的內容，response 是我們要回傳給客戶端的內容
http.createServer(function(request, response)
{
    console.log('hi hi hi'); //在主控台寫入 log 訊息
    response.writeHead(200, {"Content-Type": "text/plain"}); //設定 header
    response.write('hello world'); //寫入內容
    response.end(); //回應結束
    //response.end('hello world); //也可以直接在 end 輸出要給使用者的內容
}).listen(3000); //設定要監聽的 port

console.log('server start');