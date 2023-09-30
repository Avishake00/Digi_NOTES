const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
	//this user is used to authenticate which user's note is this
	user:{
	type:mongoose.Schema.Types.ObjectId,
	ref:'user'	
	},
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	tag: {
		type: String,
        default:"General"
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Notes", NoteSchema);
