const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route 	POST api/users
// @desc 	Register user
// @access 	Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	(req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body

		// see if the user exists

		// get users gravatars

		// encrypt password

		// return jsonwebtoken

		res.send('Users route');
	}
);

module.exports = router;
