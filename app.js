const http = require('http');
const os = require('os');
var requestcount = 0;

console.log("Kubia server starting...");

var handler = function(request, response) {
    console.log("Received request from " + request.connection.remoteAddress);
    requestcount++;
    if(requestcount > 5)
    {
        response.writeHead(500);
        response.end();
    }
    else
    {
        response.writeHead(200);
        response.end("You've hit " + os.hostname() + "\n");
    }
};

var www = http.createServer(handler);
www.listen(8010);