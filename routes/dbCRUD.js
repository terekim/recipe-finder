var mongoConnection = require('./mongoConnection');

exports.updateUser = function (user_info, callback) {
	mongoConnection.updateUser(function(usersColl) { //usersColl is the collection (table)
		usersColl.insert(user_info, callback);
	});
};

exports.updateDish = function (dish, callback) {
	mongoConnection.updateDish(function(dishesColl) {
		dishesColl.insert(dish, callback);
	});
}