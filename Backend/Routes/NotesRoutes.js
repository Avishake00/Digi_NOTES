const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Notes = require("../models/NotesModel");
const { check } = require("express-validator");
const fetchUser = require("../Middleware/fetchUserMiddleware");
const {
	fetchNotes,
	addNotes,
	updateNotes,
	deletenotes,
} = require("../Controllers/NotesControllers");

//this is used to fetch all notes of a user
//here fetchUser is used to get the id of the user and with that id we get the notes of the user
router.get("/fetchallNotes", fetchUser, fetchNotes);

router.post(
	"/addNotes",
	fetchUser,
	[
		// Validation checks for user input
		check("title", "Enter a Valid Title").isLength({
			min: 5,
		}),
		check(
			"description",
			"Description must be minimum of 5 characters"
		).isLength({ min: 5 }),
	],
	addNotes
);

//to update the note
router.put("/updatenote/:id", fetchUser, updateNotes);


//to delete the note
router.delete("/deletenote/:id", fetchUser, deletenotes);

module.exports = router;
