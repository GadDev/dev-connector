const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// Get token from header

	const token = req.header('x-auth-token');

	//check if no token
	if(!token) {
		return res.status(401).json({msg: "now token, authorization denied"});

		//Verify token
		try {

		}catch(err) {

		}
	}
};
