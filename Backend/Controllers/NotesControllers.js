const Notes = require("../models/NotesModel");
const { validationResult } = require("express-validator");

//this is used fetch notes for a user
const fetchNotes = async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.id });
		res.json(notes);
	} catch (err) {
		// Handle errors appropriately
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
//this is used to addNote for a perticular user
const addNotes = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// If there are validation errors, return them as a JSON response
		return res.status(400).json(errors);
	} else {
		try {
			const { title, description, tag } = req.body;

			const note = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const saveNote = await note.save();
			res.json(saveNote);
		} catch (error) {
			res.status(400).send("Internal Server Error");
		}
	}
};

const updateNotes = async (req, res) => {
	const { title, description, tag } = req.body;
	try {
		// Create a newNote object
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}

		// Find the note to be updated and update it
		console.log(req.params.id);
		const note = await Notes.findById(req.params.id);//here we have to send the note's id not the user id cause user can have many notes but we want to update a single note
		console.log(note);
		if (!note) {
			return res.status(404).send("Note Not Found");
		}

		// Ensure the user ID of the note matches the authenticated user's ID
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		// Update the note using findByIdAndUpdate with req.params.id
		const updatedNote = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);

		if (!updatedNote) {
			return res.status(404).send("Updated Note Not Found");
		}

		res.json({ note: updatedNote });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
};

const deletenotes = async (req, res) => {
	try {
		// Find the note to be delete and delete it
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not Found");
		}

		// Allow deletion only if user owns this Note
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		note = await Notes.findByIdAndDelete(req.params.id);
		res.json({ Success: "Note has been deleted", note: note });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = { fetchNotes, addNotes, updateNotes, deletenotes };
