
var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
  res.redirect('/index.html');
});


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  app.use(express.static(path.join(__dirname, 'public')));
   app.use(allowCrossDomain);

  console.log('Example app listening at http://%s:%s', host, port);

});


