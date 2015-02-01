var db = require('./dbCRUD');
var uuid = require('./uuidGenerator');
var mongoConnection = require('./mongoConnection');


exports.updateUser = function(req, res) {
	var user = req.body
	console.log(user);

	db.updateUser(user, function() {
		res.send("updated");
	})
	// var first_name = req[0].firstname;
	// var last_name = req[0].lastname;
	// var fb_id = req[0].id;



}

//Adds a dish to the DB
exports.addDish = function(req, res) {
	var dish = req.body.Dish;
	console.log(dish);
	db.createDish(dish, function() {
		res.send("Dish added!");
	});
};

//Removes the dish from DB
exports.removeDish = function(req, res) {
	var dish = req.body.Dish;
	console.log(dish);
	db.removeDish(dish, function() {
		res.send("Dish removed")
	});
};

