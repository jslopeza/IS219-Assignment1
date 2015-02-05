var http = require('http'),
    port = process.env.PORT || 3000,
    fs = require('fs'),
    headers = 'Date, User Agent\n',
    fileName = 'log.csv';
createFile(fileName, headers);

var server = http.createServer(function(req, res) {}).listen(port, function() {
    console.log('The server is listening on port ' + port);
});

server.on('request', function(req, res) {
    var userAgent = req.headers['user-agent'];
    userAgent = escapeComma(userAgent);
    var date = new Date();
    var string = date + ' , ' + userAgent + '\n';
    appendLog(fileName, string);
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end('<h1>Request Captured</h1>');
});


// Checks if file exists or else creates the file
function createFile(fileName, csvHeaders) {
    fs.readFile(fileName, function(err, data) {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.writeFile(fileName, csvHeaders, function(e) {
                    if (e) console.log(e);
                });
            } else {
                throw new Error(err);
            }
        }
    });
}

function appendLog(fileName, data) {
    fs.appendFile(fileName, data, function(err) {
        if (err) throw new Error(err);
    });
}

function escapeComma(text) {
    return text.replace(',', ";");
}
