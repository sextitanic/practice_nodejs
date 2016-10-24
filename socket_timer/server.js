var http = require('http').createServer(handler); //使用 http 套件建立伺服器
var socket = require('socket.io').listen(http); //使用 socket.io 建立 socket server
var fs = require('fs'); //讀取檔案的套件
var html = fs.readFileSync('./socket_timer/index.html', 'utf8'); //讀取檔案

//client 端連線時要處理的 function
function handler(req, res)
{
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
    res.end(html); //將網頁輸出
}

function tick () {
    var now = new Date();
    var year = now.getFullYear();
    var month = '0' + (now.getMonth() + 1);
    var day = '0' + now.getDate();
    var hour = '0' + now.getHours();
    var mins = '0' + now.getMinutes();
    var sec = '0' + now.getSeconds();
    
    now = year + '/' + month.substr(-2, 2) + '/' + day.substr(-2, 2) + ' ' + hour.substr(-2, 2) + ':' + mins.substr(-2, 2) + ':' + sec.substr(-2, 2);
    //觸發 client 端的 now_date 事件
    socket.emit('now_date', {send_date: now});
}
//每 1000 毫秒執行一次
setInterval(tick, 1000);

http.listen(8080);