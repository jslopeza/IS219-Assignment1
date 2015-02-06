var http = require('http'),
    port = process.env.PORT || 3000,
    fs = require('fs'),
    headers = 'Date, User Agent\n',
    fileName = 'log.csv';

createFile(fileName, headers);

var server = http.createServer().listen(port, function () {
    console.log('The server is listening on port ' + port);
});

server.on('request', function (req, res) {
    var userAgent = req.headers['user-agent'];
    userAgent = escapeComma(userAgent);
    var date = new Date();
    var string = date + ' , ' + userAgent + '\n';
    appendLog(fileName, string);
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(data);
    });
});

// Checks if file exists or else creates the file
function createFile(fileName, csvHeaders) {
    fs.exists(fileName, function (args) {
        if (!args) {
            fs.writeFile(fileName, csvHeaders, function (err) {
                if (err) throw err;
            });
        }
    });
}

function appendLog(fileName, data) {
    fs.appendFile(fileName, data, function (err) {
        if (err) throw err;
    });
}

function escapeComma(text) {
    return text.replace(',', ";");
}
