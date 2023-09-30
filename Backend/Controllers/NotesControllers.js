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

const updateNotes=async (req, res) => {
    const { title, description, tag } = req.body;

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

    try {
        const currentUser = await Notes.findById(req.params.id);
        if (!currentUser) {
            return res.status(404).send("Not Found");
        }
        if (currentUser.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const deletenotes=async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params['id']);
        if (!note) { return res.status(404).send("Not Found2") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params['id'])
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { fetchNotes, addNotes,updateNotes,deletenotes};
