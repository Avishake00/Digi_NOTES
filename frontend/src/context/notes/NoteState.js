import React, { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
	

	const s1 = {
		name: "avishake",
		class: "6b",
	};
    const [state, setstate] = useState(s1);

	const update = () => {
		setTimeout(() => {
			setstate({
				name: "tania",
				class: "5b",
			});
		}, 1000);
	};

	return (
		<Notecontext.Provider value={{ state, update }}>
			{props.children}
		</Notecontext.Provider>
	);
};

export default NoteState;
