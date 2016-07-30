var Join = require('mongoose').model('Join');

exports.post = function(req, res) {
	var data = {};

	if(req.body.name)
		data.name = req.body.name;
	if(req.body.lastName)
		data.lastName = req.body.lastName;
	if(req.body.email)
		data.email = req.body.email
	if(req.body.phone)
		data.phone = req.body.phone;
	if(req.body.comments)
		data.comments = req.body.comments;

	var joins = new Join(data);

	joins.save(function (err, collection) {
		if(err) {
			res.status(500).json({success: false});
			res.end();
		}

		res.status(200).json({success: true});
		res.end();
	})
}