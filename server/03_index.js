/**
 * 載入 server_base 檔，輕鬆建立伺服器
 */

var server = require('./03_server_base'); //載入同一層目錄的 03_server_base.js 檔

server.start(3000); //建立伺服器，監聽 3000 port

console.log('server start');