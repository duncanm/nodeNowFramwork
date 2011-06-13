var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),
  nowjs = require("now"),
   _ = require('underscore')._,
  backbone = require('backbone'), 
  Client = require('mysql').Client,
  client = new Client(),
  TEST_DATABASE = 'nodejs_mysql_test',
  TEST_TABLE = 'test',
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



client.user = 'node';
client.password = 'node';
client.database = 'cad';
client.connect(connected);


cad = require("./cad-system.js").cad(server, everyone, client);


everyone.now.consoleTest = function() {
		console.log('test!!');
	};


everyone.now.reportInsertion = function( tablename, id ){
	console.log(tablename, id);
	everyone.now.receiveInsertion(tablename, id);
};



function log(statCode, url, ip, err) {
  var logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err)
    logStr += ' - ' + err;
  //console.log(logStr);
}

function connected() {
	console.log('db connected');
	client.query("SET @@session.date_format='%d-%m-%Y'");

	
	
};
