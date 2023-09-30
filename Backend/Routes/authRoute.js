const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { check} = require("express-validator");
const { SingupAuth, loginAuth, getUserdata } = require("../Controllers/userControllers");
const fetchUser = require("../Middleware/fetchUserMiddleware");

// POST endpoint for creating a new user
router.post(
	"/CreateUser",
	[
		// Validation checks for user input
		check("name", "Name length should be min 10 characters").isLength({
			min: 5,
		}),
		check("email", "Enter Valid Email").isEmail(),
		check("email", "Email length should be min 10 characters").isLength({
			min: 10,
		}),
		check("password", "Password Length should be min 8 characters").isLength({
			min: 8,
		}),
	],
	SingupAuth
);

router.post(
	"/login",
	[
		// Validation checks for user input
		
		check("email", "Enter Valid Email").isEmail(),
		check("email", "Email length should be min 10 characters").isLength({
			min: 10,
		}),
		check("password", "Password Length should be min 8 characters").exists().isLength({
			min: 8,
		}),
	],
	loginAuth
);




router.get('/getUser', fetchUser,getUserdata);





module.exports = router;
