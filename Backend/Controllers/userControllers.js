const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const secretKey = "avishake"; // Replace with a secure secret key in production

// Function for user authentication and user creation
const SingupAuth = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// If there are validation errors, return them as a JSON response
		return res.status(400).json(errors);
	} else {
		try {
			let user = await User.findOne({ email: req.body.email });

			if (user) {
				// If a user with the same email exists, return an error
				return res
					.status(400)
					.json({ error: "Sorry, this email already exists" });
			}

			let salt = await bcrypt.genSaltSync(10);
			const encryptPass = await bcrypt.hash(req.body.password, salt);

			// Create a new user in the database
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: encryptPass,
			});

			// Create a JSON Web Token (JWT) for the user
			const data = {
				user: {
					id: user.id,
				},
			};
			var token = jwt.sign(data, secretKey);

			// Send the JWT as a response
			res.send({ token });
		} catch (error) {
			// Handle any errors that occur during user creation
			res.status(400).send("Internal Server Error");
		}
	}
};

//function for authenticate login user
const loginAuth = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// If there are validation errors, return them as a JSON response
		return res.status(400).json(errors);
	} else {
		try {
			const { email, password } = req.body;

			let user = await User.findOne({ email });

			if (!user) {
				// If a user with the same email does not exists, return an error
				return res.status(400).json({ error: "Use valid credentials" });
			}

			const ComparePassword = await bcrypt.compare(password, user.password);
			if (!ComparePassword) {
				return res.status(400).json({ error: "Use valid credentials" });
			}

			//if password match then send the webtoken
			const data = {
				user: {
					id: user.id,
				},
			};
			var token = jwt.sign(data, secretKey);
			res.send({ token });
		} catch (error) {
			// Handle any errors that occur during user creation
			res.status(400).send("Internal Server Error");
		}
	}
};

const getUserdata = async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(400).send("Internal server error");
	}
};
// POST endpoints
module.exports = { SingupAuth, loginAuth, getUserdata };
