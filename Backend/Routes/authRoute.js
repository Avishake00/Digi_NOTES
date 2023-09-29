const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");

router.post(
	"/CreateUser",
	[
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
	async(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json(errors);
		} else {
            try {
                let user = await User.findOne({ email: req.body.email });

			if (user) {
				return res
					.status(400)
					.json({ error: "Sorry this email already exists" });
			}

			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})
			
            res.send(user)
            } catch (error) {
                res.status(400).send("Error occured")
                 
            }
			
		}
	}
);

module.exports = router;
