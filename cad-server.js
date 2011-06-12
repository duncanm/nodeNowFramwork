var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),
  db = require('mysql-native').createTCPClient(),
  nowjs = require("now"),
   _ = require('underscore')._,
  backbone = require('backbone'), 
  cad;



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
 		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end("Error 404: File not found");
        log(404, req.url, ip, err);
   });
})

server.listen(PORT);
everyone = nowjs.initialize(server);
db.auto_prepare = true;
db.auth("cad", "node", "node");
cad = require("./cad-system.js").cad(server, everyone, db);


everyone.now.consoleTest = function() {
		console.log('test!!');
	};


function log(statCode, url, ip, err) {
  var logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err)
    logStr += ' - ' + err;
  console.log(logStr);
}