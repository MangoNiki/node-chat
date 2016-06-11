const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const cache = {};
const basePath = 'http://localhost:3000';

//创建一个服务器
var server = http.createServer(function(request, response) {
    var filePath = './',
        requestUrl = request.url;

    if (requestUrl === '/') {
        filePath = './public/index.html';
    } else {
        filePath = './public' + requestUrl;
    }

    // serveStatic(response, cache, filePath);
    serveStatic_dev(response, cache, filePath);
});

//监听端口，启动服务器
server.listen(3000, function() {
    console.info('Server listening on port 3000....');
});

//Socket.IO监听服务器
const chatServer = require('./lib/chat-server');
chatServer.listen(server);


//发送静态文件
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        redirectTo_404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                redirectTo_404(response);
            }
        });
    }
}

function serveStatic_dev(response, cache, absPath) {
    fs.exists(absPath, function(exists) {
        if (exists) {
            fs.readFile(absPath, function(err, data) {
                if (err) {
                    redirectTo_404(response);
                } else {
                    sendFile(response, absPath, data);
                }
            });
        } else {
            redirectTo_404(response);
        }
    });
}

//处理404 错误
function redirectTo_404(response) {
    var absPath = './public/404.html';
    fs.readFile(absPath, function(err, data) {
        if (err) {
            sendErrorCode(response);
        } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
        }
    });
}

//发送错误码
function sendErrorCode(response, code) {
    response.writeHead(code, {
        'Content-Type': 'text/plan'
    });
    response.write('<h1>' + code + '</h1>');
    response.end();
}

//发送文件
function sendFile(response, absPath, content) {
    var basename = path.basename(absPath);

    response.writeHead(200, {
        'Content-Type': mime.lookup(basename)
    });
    response.end(content);
}
