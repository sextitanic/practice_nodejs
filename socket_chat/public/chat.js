window.onload = function()
{
    //把訊息輸入框指定給 input_msg
    var input_msg = document.getElementById('msg');
    var socket = io(); //建立 socket 連線，效果等同於 io.connect();
    var username = ''; //使用者名稱，預設為空白
    var connected = false; //判斷連線是否成功，預設為 false

    socket.emit('add user'); //通知 socket server 有新成員加入

    //送出訊息到 socket server
    function sendMessage()
    {
        //取得訊息輸入框的內容，並移除左右邊空白
        var message = input_msg.value.trim();
        //如果有內容，且 socket 連線成功
        if (message.length > 0 && connected)
        {
            //先把輸入框的內容清空
            input_msg.value = '';
            addChatMessage({'username': username, 'message': message});

            //發送出 new message 事件給 socket server
            socket.emit('new message', {'username': username, 'message': message});
        }
    }

    //把對話文字顯示在畫面上
    function addChatMessage(data)
    {
        var node = document.createElement("li"); //產生一個 li 的 html 標籤
        var textNode = document.createTextNode(data.username + ': ' + data.message); //輸入內容

        node.className = 'message'; //設定 class name

        //如果使用者名稱等於傳進來的使用者名稱，代表是本機使用者的訊息
        if(username == data.username)
        {
            //那就把字變成紅色，方便辨識
            node.style.cssText = 'color: red;'; //設定行內 css style
        }

        node.appendChild(textNode); //把輸入的內容附加到剛才產生的 li 標籤內
        document.getElementById("chat_msg").appendChild(node); //再把 li 標籤和內容附加到聊天視窗 chat_msg 元素裡
    }

    //把成員加入/離開的訊息顯示在畫面上
    function addJoinMessage(message)
    {
        var node = document.createElement("li"); //產生一個 li 的 html 標籤
        var textNode = document.createTextNode(message); //輸入內容

        node.className = 'log'; //設定 class name
        node.style.cssText = 'display: list-item;'; //設定行內 css style

        node.appendChild(textNode); //把輸入的內容附加到剛才產生的 li 標籤內
        document.getElementById("chat_msg").appendChild(node); //再把 li 標籤和內容附加到聊天視窗 chat_msg 元素裡
    }

    //設定一個 login 的事件等待 socket server 的觸發
    //取得伺服器幫我隨機取的使用者名稱
    socket.on('login', function(data)
    {
        //把伺服器隨機取得的暱稱指定給變數 username
        username = data.username;
        //連線成功，把 connected 變數設為 true
        connected = true;
        //在畫面上顯歡迎的示訊息
        addJoinMessage(username + ' 你好，歡迎加入聊天室，目前共有 ' + data.numUsers + ' 名用戶');
    });

    //設定一個 user joined 的事件等待 socket server 觸發
    //當有別人登入的時候就會傳送資料過來
    socket.on('user joined', function(data){
        //當有人加入聊天室之後在畫面上顯示通知的訊息
        addJoinMessage(data.username + ' 加入聊天室，目前共有 ' + data.numUsers + ' 人');
    });

    //當其他使用者斷線時，就會觸發 user left 的事件
    socket.on('user left', function(data)
    {
        //傳送有人離開的訊息
        addJoinMessage('== ' + data.username + ' 離開聊天室，目前共有 ' + data.numUsers + ' 人 ==');
    });

    //設定 new message 的事件等待 socket server 觸發
    //當別的使用者送出訊息時就會傳送資料過來
    socket.on('new message', function(data)
    {
        //將其他使用者發送的訊息輸出到畫面上
        addChatMessage(data);
    });

    //註冊一個 javascript 的 keyup 事件
    window.addEventListener('keyup', function(event)
    {
        //如果使用者按下的是 Enter 鍵，並且已經跟伺服器註冊過取得了 username 之後才執行
        if(event.which == 13 && username != '')
        {
            sendMessage();
        }
    });
};