var http = require('http');
var food2fork_KEY = '1023f60a1e825a60b14cde2ca71bca2b';
var searchPath = '';
var options = {
  host: 'api.pearson.com',
  port: 80,
  path: searchPath,
  method: 'GET'
};
// var searchPath = '/api/search?key={' + food2fork_KEY + '}&q=';
// var options = {
//   host: 'food2fork.com',
//   path: searchPath,
//   method: 'GET'
// };

var createIngredientSearchPath = function(ingredients) {
  for (var i=0; i < ingredients.length; i++) {
    searchPath += ingredients[i].toString();
    if (i !== ingredients.length -1)
      searchPath+= '%2C%20';
      // searchPath+= '%20';
  }
}

exports.searchAllIngredients = function(ingredients, callback) {
  searchPath = '/kitchen-manager/v1/recipes?ingredients-all=';
  createIngredientSearchPath(ingredients);
  options.path = searchPath;
  var data = '';

  var req = http.request(options, function(res) {
    if (res.statusCode == 200) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
        // return callback(data);
      });
      res.on('end', function() {
        callback(JSON.parse(data));
      });
    } else {
      console.log("Error: " + res.statusCode + JSON.stringify(res.headers));
    }
  });

  req.end();
};

exports.searchAnyIngredients = function(ingredients, callback) {
  searchPath = '/kitchen-manager/v1/recipes?ingredients-any=';
  createIngredientSearchPath(ingredients);
  options.path = searchPath;

  var req = http.request(options, function(res) {
    if (res.statusCode == 200) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function() {
        callback(JSON.parse(data));
      });
    } else {
      console.log("Error: " + res.statusCode + JSON.stringify(res.headers));
    }
  });

  req.end();
};


