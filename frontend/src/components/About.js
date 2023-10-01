import React, { useContext, useEffect } from "react";
import notecontext from "../context/notes/NoteContext";

const About = () => {
	const a = useContext(notecontext);
	useEffect(() => {
		a.update();
	}, []);

	return (
		<div>
			this is about {a.state.name} and class is{a.state.class}
		</div>
	);
};

export default About;
