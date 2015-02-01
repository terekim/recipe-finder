var db = require('./dbCRUD');
var uuid = require('./uuidGenerator');
var mongoConnection = require('./mongoConnection');


exports.updateUser = function(req, res) {
	var user = req.body
	console.log(user);

	db.updateUser(user, function() {
		var dishes = {
			"dishes": 5,
			"dishList": [
			  { "id": 1,
				"dishName": "Buffalo Pulled Chicken Breast"
			},
			  { "id": 2,
				"dishName": "Barbeque Chicken"
			},
			  { "id": 3,
				"dishName": "Roasted Barbeque Chicken"
			},
			  { "id": 4,
				"dishName": "Chicken Tenders"
			},
			  { "id": 5,
				"dishName": "Chicken Steak"
			}]
		};
		res.send(dishes);
		// db.getDishes()
	});
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

