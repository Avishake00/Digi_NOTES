import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
	return (
		<>
			<NoteState>
				<div className="App">
					<Router>
						<Navbar /> {/* Navbar should be inside the Router */}
						<Routes>
							<Route path="/about" element={<About />} />
							<Route path="/home" element={<Home />} />
						</Routes>
					</Router>
				</div>
			</NoteState>
		</>
	);
}

export default App;
