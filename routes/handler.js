var db = require('./dbCRUD');
var uuid = require('./uuidGenerator');
var Promise = require('promise');
var mongoConnection = require('./mongoConnection');
var pearsonAPI = require('./recipeAPI');

exports.updateUser = function(req, res) {
	var user = {};
	user._id = req.body.id; //Using fbID as the ID
	console.log(user._id);
	user.firstname = req.body.firstname;
	console.log(user.firstname);
	user.lastname = req.body.lastname;
	console.log(user.lastname);

	db.updateUser(user, function() {
		// var dishes = {
		// 	"dishes": 5,
		// 	"dishList": [
		// 	  { "id": 1,
		// 		"dishName": "Buffalo Pulled Chicken Breast"
		// 	},
		// 	  { "id": 2,
		// 		"dishName": "Barbeque Chicken"
		// 	},
		// 	  { "id": 3,
		// 		"dishName": "Roasted Barbeque Chicken"
		// 	},
		// 	  { "id": 4,
		// 		"dishName": "Chicken Tenders"
		// 	},
		// 	  { "id": 5,
		// 		"dishName": "Chicken Steak"
		// 	}]
		// };

		// db.getDishesById(user._id, function() {
		// 	res.send("Dishes recieved!");
		// });
		// res.send(dishes);
		// db.getDishes()
	});
};

var filterRecipes = function(recipes) {
	var jsonString;
	var count = recipes.count;
	if (count < 1) return 0;
	//Constructor
	var newObj = {
		dishes : 0,
		dishList : []
	};

	newObj.dishes = count;

	for (var i = 0; i < count; i++) {
		var jsonData = {
			dishName : recipes.results[i].name,
			dishImage : recipes.results[i].image
		};
		newObj.dishList.push(jsonData);
	}

	return newObj;
}

exports.searchRecipe = function(req, res) {
	console.log("welcome to search recipes");
	var recipe = {};
	recipe.ingredients = req.body.ingredients;
	recipe.anyOrAll = req.body.anyOrAll;

	switch(parseInt(recipe.anyOrAll)) {
		case 1:
			pearsonAPI.searchAllIngredients(recipe.ingredients, function(recipes) {
				res.json(filterRecipes(recipes));
				// res.json(recipes);
			});
			break;
		case 2:
			pearsonAPI.searchAnyIngredients(recipe.ingredients, function(recipes) {
				res.json(filterRecipes(recipes));
				// res.json(recipes);
			});
			break;
		default:
			console.log("Not searching for anything");
			break;
	}
};

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

