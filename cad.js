var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),
  nowjs = require("now");
  cad = require("./cad.js").cad();



  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), 'public');

server = http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(WEBROOT, req, res)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .before(function() {
      console.log('Received Request');
    })
    .after(function(statCode) {
      log(statCode, req.url, ip);
    })
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
      log(statCode, req.url, ip, msg);
    })
    .otherwise(function(err) {
      cad.checkForURL(req, res);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
      log(404, req.url, ip, err);
    });
})


cad = {};

cad.checkForURL = function (req, res) {
  console.log('checking in cad:' + req.url);
};


server.listen(PORT);

var everyone = nowjs.initialize(server);

everyone.on("connect", function(){
  console.log("Joined: " + this.now.name);
});

everyone.on("disconnect", function(){
  console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};


function log(statCode, url, ip, err) {
  var logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err)
    logStr += ' - ' + err;
  console.log(logStr);
}
