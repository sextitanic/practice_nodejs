var express = require('express'); //載入 express framework
var app = express();
var server = require('http').createServer(app); //建立一個套用 express 規則的 http server
var io = require('socket.io').listen(server); //把剛才的 http server 套用 socket
var port = 3000; //要監聽的 port

//設定監聽 port，並且在伺服器啟動時寫 log
server.listen(port, function ()
{
    console.log('Server listening at port %d', port);
});

//把 public 資料夾設定為可直接讀取
app.use(express.static(__dirname + '/public'));

//記錄目前有哪些使用者登入，還有登入的使用者數目
var usernames = {};
var numUsers = 0;

//建立一個 connection 事件等 client 端觸發
io.on('connection', function (socket)
{
    var addedUser = false;

    //當 client 端發送一個 new message 的事件後執行此 function
    socket.on('new message', function (data)
    {
        //用 broadcast 發送 new message 觸發其他 client 端的事件
        //並將 username 和 message 回傳
        socket.broadcast.emit('new message', {
            username: data.username,
            message: data.message
        });
    });

    //當 client 端發送一個 add user 的事件後執行此 function
    socket.on('add user', function ()
    {
        //建立一個隨機的用戶名稱，並且跟 usernames json 值比對確定沒有重覆的會員名稱
        do
        {
            //將用戶名稱存進 socket 的 session 之中
            socket.username = '匿名_' + parseInt(Math.random() * 10000 + 1);
        }while(usernames[socket.username] !== undefined);

        //將產生出來的隨機用戶名稱存進 usernames 裡
        usernames[socket.username] = socket.username;
        //將使用者人數加 1
        numUsers++;
        addedUser = true;
        //發送 login 觸發傳進來的 client 端的事件
        socket.emit('login', {
            username: socket.username,
            numUsers: numUsers
        });
        //再用 broadcast 觸發其他 client 端的 user joined 事件
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    //當用戶斷線的時候執行這個事件
    socket.on('disconnect', function ()
    {
        //把用戶名稱從清單中移除
        if (addedUser)
        {
            delete usernames[socket.username];
            numUsers--;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});