import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Users from "./Users";
import Home from "./Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/users/:id?" element={<Users />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
