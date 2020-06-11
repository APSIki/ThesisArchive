var http = require('http');
var mockserver = require('mockserver');
mockserver.headers = ['Authorization']
 
http.createServer(mockserver('.')).listen(9001);