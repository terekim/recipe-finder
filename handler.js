var db = require('./dbCRUD');
var uuid = require('./uuidGenerator');
var mongoConnection = require('./mongoConnection');


exports.updateUser = function(req, res) {
	var user_id = uuid.createUUID();
	var user = req.body.userInfo;
	db.updateUser(user_id, function() {
		res.send("updated");
	})
	// var first_name = req[0].firstname;
	// var last_name = req[0].lastname;
	// var fb_id = req[0].id;



}