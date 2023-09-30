const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Notes = require("../models/NotesModel");
const { check } = require("express-validator");
const fetchUser = require("../Middleware/fetchUserMiddleware");
const { fetchNotes, addNotes, updateNotes, deletenotes } = require("../Controllers/NotesControllers");

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

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params['id']);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletenote/:id', fetchUser,deletenotes )

module.exports = router;
