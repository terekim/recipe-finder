var mongoConnection = require('./mongoConnection');

exports.updateUser = function (user_info, callback) {
	mongoConnection.updateUser(function(usersColl) {
		usersColl.update({_id: user_info._id}, { firstname: user_info.firstname, lastname: user_info.lastname}, {upsert: true}, callback);
	});
};

exports.updateDish = function (dish, callback) {
	mongoConnection.updateDish(function(dishesColl) {
		dishesColl.insert(dish, callback);
	});
};

exports.getDishesById = function (user_id, callback) {
	mongoConnection.getDishesById(function(dishesColl) {
		dishesColl.find({id: user_id}, function(err, result) {
			result.toArray(function(err, results) {
				callback[results[0]];
			});
		});
	});
};