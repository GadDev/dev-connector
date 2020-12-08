const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');

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
	async (req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		console.log(errors);
		//express-validator
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			// see if the user exists
			if (user) {
				return res.status(400).json({
					errors: [{ msg: 'User already exists' }],
				});
			}
			// get users gravatars
			const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
			user = new User({
				name,
				email,
				avatar,
				password,
			});
			// encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
			// res.send('Users registered');
		} catch (err) {
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
